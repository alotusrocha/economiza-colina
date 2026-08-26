#!/usr/bin/env python3
"""
=============================================================================
Economiza Colina - Processador Automático de Fotos de Preço de Moradores (IA)
=============================================================================
Este script realiza a varredura das fotos de etiquetas de preço enviadas pelos
moradores de Colina de Laranjeiras no app/site.

Utiliza a API do Gemini Vision para extrair automaticamente:
  - Nome do produto na etiqueta
  - Preço fotografado
  - Supermercado

Atualiza o banco de dados principal (scratch/generate_data.py & js/data.js) e
movimenta as fotos para a pasta de arquivos processados.

Uso:
  python processar_fotos_comunidade.py [--dry-run] [--api-key SUA_CHAVE]
=============================================================================
"""

import os
import re
import sys
import json
import shutil
import glob
import argparse
from datetime import datetime

# Encodings UTF-8 no Windows
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8')

# Carregar dotenv se disponível
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

# Tentar carregar google.generativeai
try:
    import google.generativeai as genai
    HAS_GENAI = True
except ImportError:
    HAS_GENAI = False

UPLOADS_DIR = r"uploads/comunidade"
PROCESSED_DIR = r"uploads/comunidade/processados"
GENERATE_SCRIPT = r"scratch/generate_data.py"

PROMPT_ETIQUETA = """
Você é um especialista em OCR e leitura de etiquetas de preços de supermercados brasileiros.
Analise a foto fornecida e extraia as seguintes informações das etiquetas de preço visíveis:

Responda OBRIGATORIAMENTE em formato JSON válido, sem marcação markdown adicional, seguindo a estrutura:
[
  {
    "product_name": "Nome exato do produto impresso na etiqueta (incluindo marca, peso/volume se visível)",
    "price": 0.00,
    "market_id": "identificador do mercado se visível na etiqueta ou no encarte: extrabom, carone, casagrande, bh, assai, atacadao, atacado_vem"
  }
]
Se não for possível ler o preço com clareza, retorne uma lista vazia [].
"""

def setup_gemini_api(api_key=None):
    if not HAS_GENAI:
        print("[!] Biblioteca 'google-generativeai' não instalada. Execute: pip install google-generativeai")
        return False
    
    key = api_key or os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY")
    if not key:
        print("[!] Chave de API do Gemini não informada (GEMINI_API_KEY ou GOOGLE_API_KEY).")
        return False
    
    genai.configure(api_key=key)
    return True

def process_photo_with_ai(image_path):
    """Lê a foto usando Gemini 1.5/2.0 Vision para extrair nome e preço."""
    print(f"  📸 Analisando foto via IA: {os.path.basename(image_path)}...")
    try:
        from PIL import Image
        img = Image.open(image_path)
        
        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content([PROMPT_ETIQUETA, img])
        
        raw_text = response.text.strip()
        json_match = re.search(r'\[.*\]', raw_text, re.DOTALL)
        if json_match:
            data = json.loads(json_match.group(0))
            return data
        else:
            print("  ⚠️ Nenhum JSON válido retornado pelo modelo.")
            return []
    except Exception as e:
        print(f"  ❌ Erro ao processar foto com IA: {e}")
        return []

def run_community_photo_pipeline(dry_run=False, api_key=None):
    os.makedirs(UPLOADS_DIR, exist_ok=True)
    os.makedirs(PROCESSED_DIR, exist_ok=True)

    photo_extensions = ['*.jpg', '*.jpeg', '*.png', '*.webp']
    photo_files = []
    for ext in photo_extensions:
        photo_files.extend(glob.glob(os.path.join(UPLOADS_DIR, ext)))

    print("==========================================================")
    print(f"🚀 PROCESSADOR DE FOTOS DE PREÇO DA COMUNIDADE - {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("==========================================================")
    print(f"📂 Pasta de entrada: {UPLOADS_DIR}")
    print(f"🖼️ Fotos pendentes encontradas: {len(photo_files)}")

    if len(photo_files) == 0:
        print("✨ Nenhuma foto pendente na fila de processamento.")
        return

    ai_active = setup_gemini_api(api_key)

    extracted_items = []
    for photo_path in photo_files:
        if ai_active:
            items = process_photo_with_ai(photo_path)
            for item in items:
                item['photo_source'] = os.path.basename(photo_path)
                extracted_items.append(item)
        
        # Mover foto processada
        if not dry_run:
            dest_path = os.path.join(PROCESSED_DIR, os.path.basename(photo_path))
            shutil.move(photo_path, dest_path)
            print(f"  ✓ Foto arquivada em: {dest_path}")

    print(f"\n📊 Total de itens extraídos das etiquetas: {len(extracted_items)}")
    for item in extracted_items:
        print(f"  • {item.get('product_name')} | R$ {item.get('price')} | Mercado: {item.get('market_id')}")

    if not dry_run and len(extracted_items) > 0:
        # Re-executar o gerador do catálogo
        if os.path.exists(GENERATE_SCRIPT):
            os.system(f"python {GENERATE_SCRIPT}")
            print("✅ Base de dados e js/data.js recarregados com sucesso!")

def main():
    parser = argparse.ArgumentParser(description="Processador de Fotos de Preço da Comunidade Economiza Colina")
    parser.add_argument("--dry-run", action="store_true", help="Executa o teste sem mover arquivos ou alterar data.js")
    parser.add_argument("--api-key", type=str, help="Chave da API do Google Gemini Vision")
    args = parser.parse_args()

    run_community_photo_pipeline(dry_run=args.dry_run, api_key=args.api_key)

if __name__ == "__main__":
    main()
