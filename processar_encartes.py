#!/usr/bin/env python3
"""
=============================================================================
Economiza Colina - Processador Automático de Encartes por IA (Gemini Vision)
=============================================================================
Este script varre imagens e PDFs de encartes de supermercados, extrai os produtos
e preços usando a API do Gemini Vision, filtra encartes VENCIDOS em relação à
data atual e atualiza automaticamente o arquivo js/data.js do site.

Uso:
  python processar_encartes.py [--api-key SUA_CHAVE] [--dry-run] [--ref-date AAAA-MM-DD]
=============================================================================
"""

import os
import re
import sys
import json
import shutil
import glob
import argparse
from datetime import datetime, date
from PIL import Image

# Tenta importar google.generativeai
try:
    import google.generativeai as genai
    HAS_GENAI = True
except ImportError:
    HAS_GENAI = False

# Tenta carregar .env se existir
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

# Mapeamento de ids válidos de supermercados no sistema
SUPERMARKET_IDS = [
    'extrabom', 'carone', 'perim', 'atacadao', 'assai', 'ok_super', 'epa', 'casagrande'
]

# Prompt detalhado para extração multimodal via Gemini Vision
PROMPT_EXTRACAO = """
Você é um assistente especialista em extrair dados de encartes e folhetos de supermercados do Brasil.
Analise com atenção a imagem/documento fornecido e extraia todas as informações das ofertas presentes.

Siga ESTRITAMENTE as instruções:
1. Identifique o supermercado emissor do encarte. O ID deve ser OBRIGATORIAMENTE um destes:
   - "extrabom" (Extrabom Supermercados)
   - "carone" (Carone Supermercados)
   - "perim" (Perim Supermercados)
   - "atacadao" (Atacadão)
   - "assai" (Assaí Atacadista)
   - "ok_super" (OK Superatacado / OK Hiper)
   - "epa" (EPA Supermercados)
   - "casagrande" (Rede Casagrande)

2. Identifique o Período de Validade da oferta:
   - Forneça "startDate" no formato YYYY-MM-DD (ex: 2026-08-06). Se o ano não estiver explícito, assuma o ano atual (2026).
   - Forneça "endDate" no formato YYYY-MM-DD (ex: 2026-08-12). Se for oferta de 1 dia só, startDate == endDate.
   - Forneça "validityStr" amigável (ex: "Válido 06/08 a 12/08" ou "Válido 07/08").

3. Extraia TODOS os produtos visíveis com seus respectivos preços de oferta.
   Para cada produto, forneça:
   - "name": Nome completo com marca, versão e peso/volume (ex: "Óleo de Soja Vila Velha 900ml", "Arroz Tio João Tipo 1 5kg", "Contrafilé Friboi kg").
   - "category": Categoria exata (escolha apenas uma entre: "acougue", "hortifruti", "laticinios", "mercearia", "bebidas", "limpeza", "higiene").
   - "unit": Unidade/Embalagem (ex: "1kg", "500g", "900ml", "2L", "unidade", "kg").
   - "offerPrice": Preço numérico em Reais (ex: 6.98 para R$ 6,98). Use ponto como separador decimal.
   - "discountTag": Texto de oferta especial se houver (ex: "Clube Extrabom R$ 6,98", "Leve + Pague -", "Atacado R$ 5,99" ou null).
   - "featured": boolean true se for uma oferta principal/destaque da capa do encarte, caso contrário false.

Retorne EXATAMENTE um objeto JSON válido no seguinte formato sem nenhum texto extra ou marcação markdown adicional:
{
  "market": "extrabom",
  "title": "Título do encarte ou descrição rápida da página",
  "startDate": "2026-08-06",
  "endDate": "2026-08-12",
  "validityStr": "Válido 06/08 a 12/08",
  "products": [
    {
      "name": "Nome do produto 1",
      "category": "mercearia",
      "unit": "900ml",
      "offerPrice": 6.98,
      "discountTag": "Clube Extrabom R$ 6,98",
      "featured": true
    }
  ]
}
"""

def extrair_dados_encarte(caminho_arquivo, api_key):
    """Envia a imagem/PDF do encarte para a API do Gemini Vision e retorna os dados extraídos."""
    if not HAS_GENAI:
        raise ImportError("O pacote 'google-generativeai' não está instalado. Execute: pip install google-generativeai pillow")
    
    genai.configure(api_key=api_key)
    
    # Seleciona o modelo multimodal Gemini 2.5 Flash / 1.5 Flash
    try:
        model = genai.GenerativeModel('gemini-2.5-flash')
    except Exception:
        model = genai.GenerativeModel('gemini-1.5-flash')
    
    # Abre a imagem
    img = Image.open(caminho_arquivo)
    
    response = model.generate_content([PROMPT_EXTRACAO, img])
    
    text = response.text.strip()
    
    # Limpa possíveis blocos ```json ... ```
    text = re.sub(r'^```(?:json)?\s*', '', text, flags=re.MULTILINE)
    text = re.sub(r'\s*```$', '', text, flags=re.MULTILINE)
    
    data = json.loads(text)
    return data


def parse_data_iso(data_str):
    """Converte string YYYY-MM-DD em objeto date."""
    try:
        return datetime.strptime(data_str.strip(), "%Y-%m-%d").date()
    except Exception:
        return None


def mover_para_vencidos(caminho_arquivo):
    """Move um arquivo de encarte expirado para a subpasta ./encartes_vencidos/"""
    pasta_dest = os.path.join(os.path.dirname(caminho_arquivo), "encartes_vencidos")
    os.makedirs(pasta_dest, exist_ok=True)
    nome_arquivo = os.path.basename(caminho_arquivo)
    caminho_dest = os.path.join(pasta_dest, nome_arquivo)
    shutil.move(caminho_arquivo, caminho_dest)
    return caminho_dest


def gerar_conteudo_js(encartes_validos, produtos_validos):
    """Gera o código JavaScript para ser salvo no arquivo js/data.js."""
    
    # Código cabeçalho e SUPERMARKETS
    supermarkets_code = """// Catálogo Completo de Supermercados, Encartes e Produtos
// Colina de Laranjeiras & Imediações (Serra / ES)
// Gerado automaticamente pelo Processador de Encartes IA

const SUPERMARKETS = [
  {
    id: 'extrabom',
    name: 'Extrabom Supermercados',
    location: 'Colina de Laranjeiras (Shopping Montserrat)',
    badge: 'No Bairro',
    color: '#e63946',
    distance: '0.4 km',
    isLocal: true
  },
  {
    id: 'carone',
    name: 'Carone Supermercados',
    location: 'Laranjeiras (Av. Central)',
    badge: 'Imediações',
    color: '#0077b6',
    distance: '1.2 km',
    isLocal: false
  },
  {
    id: 'perim',
    name: 'Perim Supermercados',
    location: 'Laranjeiras (Av. Eldes Scherrer)',
    badge: 'Imediações',
    color: '#2a9d8f',
    distance: '1.5 km',
    isLocal: false
  },
  {
    id: 'atacadao',
    name: 'Atacadão Serra',
    location: 'Colina de Laranjeiras (BR-101 Norte)',
    badge: 'Atacarejo No Bairro',
    color: '#f4a261',
    distance: '0.8 km',
    isLocal: true
  },
  {
    id: 'assai',
    name: 'Assaí Atacadista',
    location: 'Laranjeiras / Civit',
    badge: 'Atacarejo',
    color: '#023e8a',
    distance: '1.8 km',
    isLocal: false
  },
  {
    id: 'ok_super',
    name: 'OK Superatacado',
    location: 'Laranjeiras (Av. Eldes Scherrer)',
    badge: 'Atacarejo',
    color: '#e76f51',
    distance: '1.6 km',
    isLocal: false
  },
  {
    id: 'epa',
    name: 'EPA Supermercados',
    location: 'Laranjeiras',
    badge: 'Imediações',
    color: '#d62828',
    distance: '1.4 km',
    isLocal: false
  },
  {
    id: 'casagrande',
    name: 'Rede Casagrande Supermercados',
    location: 'Serra / Civit (Av. Talma Rodrigues)',
    badge: 'Imediações',
    color: '#16a34a',
    distance: '2.1 km',
    isLocal: false
  }
];
"""

    categories_code = """
const CATEGORIES = [
  { id: 'all', name: 'Todas as Ofertas', icon: '🏷️' },
  { id: 'acougue', name: 'Açougue & Carnes', icon: '🥩' },
  { id: 'hortifruti', name: 'Hortifrúti & Frutas', icon: '🥦' },
  { id: 'laticinios', name: 'Laticínios & Frios', icon: '🧀' },
  { id: 'mercearia', name: 'Mercearia & Matinais', icon: '🌾' },
  { id: 'bebidas', name: 'Bebidas & Cervejas', icon: '🥤' },
  { id: 'limpeza', name: 'Limpeza & Casa', icon: '🧹' },
  { id: 'higiene', name: 'Higiene & Perfumaria', icon: '🧴' }
];
"""

    encartes_json = json.dumps(encartes_validos, indent=2, ensure_ascii=False)
    products_json = json.dumps(produtos_validos, indent=2, ensure_ascii=False)

    full_code = f"{supermarkets_code}\nconst ENCARTES = {encartes_json};\n{categories_code}\nconst PRODUCTS = {products_json};\n"
    return full_code


def main():
    parser = argparse.ArgumentParser(description="Processador de Encartes com IA e Validação de Validade")
    parser.add_argument("--api-key", help="Sua GEMINI_API_KEY (ou defina a var de ambiente GEMINI_API_KEY)")
    parser.add_argument("--ref-date", help="Data de referência para teste no formato YYYY-MM-DD (Padrão: Hoje)")
    parser.add_argument("--dry-run", action="store_true", help="Executa a análise sem mover arquivos nem sobrescrever data.js")
    parser.add_argument("--dir", default=".", help="Diretório onde estão as fotos dos encartes (Padrão: .)")
    
    args = parser.parse_args()

    # Define a chave de API
    api_key = args.api_key or os.environ.get("GEMINI_API_KEY")
    if not api_key:
        print("❌ ERRO: A chave de API do Gemini não foi informada!")
        print("Defina a variável de ambiente GEMINI_API_KEY ou use a opção --api-key.")
        print("Exemplo: export GEMINI_API_KEY='SuaChaveAqui'")
        sys.exit(1)

    # Define a data de referência para verificação de validade
    if args.ref_date:
        ref_date = parse_data_iso(args.ref_date)
        if not ref_date:
            print(f"❌ Data de referência inválida: {args.ref_date}. Use AAAA-MM-DD.")
            sys.exit(1)
    else:
        ref_date = date.today()

    print("=========================================================================")
    print(f"🛒 Economiza Colina - Processando Encartes")
    print(f"📅 Data de Referência para Validade: {ref_date.strftime('%d/%m/%Y')}")
    print(f"🔍 Diretório de Busca: {os.path.abspath(args.dir)}")
    print("=========================================================================\n")

    # Localiza arquivos de encartes suportados
    exts = ['*.png', '*.jpg', '*.jpeg', '*.webp']
    arquivos = []
    for ext in exts:
        arquivos.extend(glob.glob(os.path.join(args.dir, ext)))
    
    # Filtra apenas arquivos conhecidos de encartes ou novas imagens de WhatsApp
    arquivos_encartes = [
        f for f in arquivos 
        if os.path.basename(f).startswith(('oferta-', 'campanha-', 'WhatsApp', 'casagrande-'))
    ]

    if not arquivos_encartes:
        print("ℹ️ Nenhum arquivo de encarte encontrado para processamento.")
        sys.exit(0)

    print(f"📄 Encontrados {len(arquivos_encartes)} arquivos de encarte para análise:\n")

    encartes_validos = []
    produtos_validos = []
    encartes_vencidos_count = 0
    encartes_validos_count = 0
    product_counter = 1
    encarte_id_counter = 1

    for file_path in arquivos_encartes:
        filename = os.path.basename(file_path)
        print(f"📸 Analisando com Gemini Vision: {filename}...")

        try:
            dados = extrair_dados_encarte(file_path, api_key)
        except Exception as e:
            print(f"  ❌ Erro ao analisar {filename}: {e}\n")
            continue

        end_date = parse_data_iso(dados.get("endDate", ""))
        validity_str = dados.get("validityStr", "Sem data")
        market_id = dados.get("market", "extrabom")
        if market_id not in SUPERMARKET_IDS:
            market_id = "extrabom"

        # VERIFICAÇÃO DE VALIDADE
        is_expired = False
        if end_date and end_date < ref_date:
            is_expired = True

        if is_expired:
            encartes_vencidos_count += 1
            print(f"  ⚠️ ENCARTE VENCIDO!")
            print(f"     Supermercado: {market_id.upper()}")
            print(f"     Validade: {validity_str} (Venceu em {end_date.strftime('%d/%m/%Y')})")
            print(f"     Status: DESCARTADO da lista de ofertas ativas.")

            if not args.dry_run:
                dest = mover_para_vencidos(file_path)
                print(f"     📁 Movido para: {dest}")
            print()
            continue

        # ENCARTE VÁLIDO!
        encartes_validos_count += 1
        current_encarte_id = encarte_id_counter
        encarte_id_counter += 1

        encartes_validos.append({
            "id": current_encarte_id,
            "file": filename,
            "title": dados.get("title", f"Ofertas {market_id.capitalize()}"),
            "market": market_id,
            "validity": validity_str
        })

        prods = dados.get("products", [])
        print(f"  ✅ ENCARTE VÁLIDO!")
        print(f"     Supermercado: {market_id.upper()}")
        print(f"     Validade: {validity_str}")
        print(f"     Produtos encontrados: {len(prods)}")

        for p in prods:
            prod_id = f"{market_id[:3]}_{product_counter}"
            product_counter += 1

            price = float(p.get("offerPrice", 0.0))
            
            # Monta estrutura de comparação fictícia/referência para o card
            prices_dict = {market_id: price}

            produtos_validos.append({
                "id": prod_id,
                "name": p.get("name", "Produto sem nome"),
                "category": p.get("category", "mercearia"),
                "unit": p.get("unit", "unidade"),
                "image": "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&auto=format&fit=crop&q=80",
                "encarteId": current_encarte_id,
                "offerMarketId": market_id,
                "offerPrice": price,
                "validity": validity_str,
                "prices": prices_dict,
                "featured": p.get("featured", False),
                "discountTag": p.get("discountTag", f"Oferta {market_id.capitalize()} R$ {price:.2f}".replace('.', ','))
            })

        print()

    print("=========================================================================")
    print("RESUMO DO PROCESSAMENTO:")
    print(f"  • Encartes Válidos Incluídos: {encartes_validos_count}")
    print(f"  • Encartes Vencidos Descartados: {encartes_vencidos_count}")
    print(f"  • Total de Produtos Atualizados: {len(produtos_validos)}")
    print("=========================================================================\n")

    if args.dry_run:
        print("⚡ MODO DRY-RUN: Nenhuma alteração foi salva no arquivo js/data.js.")
    else:
        target_js = os.path.join(args.dir, "js", "data.js")
        if os.path.exists(target_js):
            backup_js = target_js + ".bak"
            shutil.copyfile(target_js, backup_js)
            print(f"💾 Backup criado em: {backup_js}")

        novo_conteudo_js = gerar_conteudo_js(encartes_validos, produtos_validos)
        with open(target_js, "w", encoding="utf-8") as f:
            f.write(novo_conteudo_js)
        
        print(f"🎉 Sucesso! {target_js} foi atualizado com as ofertas válidas.")

if __name__ == "__main__":
    main()
