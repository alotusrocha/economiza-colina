#!/usr/bin/env python3
"""
=============================================================================
Economiza Colina - Raspador de Preços Online em Tempo Real (Outubro/2026)
=============================================================================
Realiza raspagem direta (Web Scraping & API VTEX) nos portais dos supermercados
de Colina de Laranjeiras e Serra/ES:
  1. Extrabom (https://www.extrabom.com.br/busca/?q=...)
  2. Carone (https://www.carone.com.br/api/catalog_system/pub/products/search)
  3. Atacadão Serra (https://www.atacadao.com.br/api/catalog_system/pub/products/search)
  + Comparativo calibrado com Rede Casagrande, Supermercados BH, Assaí e Atacado Vem.

Uso:
  python consultar_precos_online.py [--termos "arroz,feijao,cafe"] [--dry-run]
=============================================================================
"""

import os
import re
import sys
import ssl
import html
import json
import time
import argparse
import urllib.request
import urllib.parse

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8')

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,application/json,*/*;q=0.8',
    'Accept-Language': 'pt-BR,pt;q=0.9',
}

def raspar_extrabom_html(termo):
    """Extrai produtos e preços reais renderizados no HTML de busca do Extrabom."""
    url = f"https://www.extrabom.com.br/busca/?q={urllib.parse.quote(termo)}"
    req = urllib.request.Request(url, headers=HEADERS)
    items = []
    try:
        with urllib.request.urlopen(req, context=ctx, timeout=12) as resp:
            page_html = resp.read().decode('utf-8', errors='ignore')
            cards = re.findall(r'<a href="p/[^"]+" class="carousel__box__dados">(.*?)</a>', page_html, re.S)
            for card in cards:
                name_m = re.search(r'<p class="item-name__text">\s*(.*?)\s*</p>', card, re.S)
                if not name_m:
                    continue
                name = html.unescape(re.sub(r'\s+', ' ', name_m.group(1)).strip())
                por_m = re.search(r'<strong class="item-por__val">\s*R\$\s*<span>(\d+)</span>,(\d{2})\s*</strong>', card, re.S)
                clube_m = re.search(r'<div class="item-clube__price">.*?R\$\s*<span>(\d+)</span>,(\d{2})', card, re.S)
                price = None
                if clube_m:
                    price = float(f"{clube_m.group(1)}.{clube_m.group(2)}")
                elif por_m:
                    price = float(f"{por_m.group(1)}.{por_m.group(2)}")
                if price and 0.5 < price < 350:
                    items.append({"name": name, "price": round(price, 2), "store": "extrabom"})
    except Exception as e:
        print(f"⚠️ [Extrabom] Aviso em '{termo}': {e}")
    return items

def raspar_vtex_api(domain, store_id, termo, require_avail=True):
    """Extrai produtos e preços reais da API VTEX pública (Carone e Atacadão)."""
    url = f"https://{domain}/api/catalog_system/pub/products/search?ft={urllib.parse.quote(termo)}&_from=0&_to=20"
    req = urllib.request.Request(url, headers=HEADERS)
    items = []
    try:
        with urllib.request.urlopen(req, context=ctx, timeout=12) as resp:
            data = json.loads(resp.read().decode('utf-8', errors='ignore'))
            for prod in data:
                name = html.unescape(prod.get('productName', '').strip())
                for sku in prod.get('items', []):
                    for seller in sku.get('sellers', []):
                        offer = seller.get('commertialOffer', {})
                        price = offer.get('Price', 0)
                        avail = offer.get('AvailableQuantity', 0)
                        if require_avail and avail <= 0:
                            continue
                        if price and 0.5 < price < 160 and round(price, 2) not in (99.9, 99.99, 100.0):
                            items.append({
                                "name": name,
                                "price": round(float(price), 2),
                                "store": store_id
                            })
                            break
                    else:
                        continue
                    break
    except Exception as e:
        print(f"⚠️ [{store_id}] Aviso em '{termo}': {e}")
    return items

def main():
    parser = argparse.ArgumentParser(description="Raspador em Tempo Real dos Supermercados de Colina de Laranjeiras")
    parser.add_argument("--termos", help="Termos de busca separados por vírgula (ex: arroz,feijao,cafe)")
    parser.add_argument("--dry-run", action="store_true", help="Apenas exibe os preços raspados no terminal")
    args = parser.parse_args()

    termos = [t.strip() for t in args.termos.split(',')] if args.termos else ["arroz", "feijao", "cafe", "leite condensado", "manteiga", "frango"]

    print("=========================================================================")
    print("🛒 Economiza Colina - Raspagem Direta nos Portais dos Supermercados")
    print("📍 Fontes Ao Vivo: Extrabom (HTML), Carone (API VTEX) e Atacadão (API VTEX)")
    print("=========================================================================\n")

    for termo in termos:
        print(f"🔎 Raspando '{termo}'...")
        eb = raspar_extrabom_html(termo)
        ca = raspar_vtex_api("www.carone.com.br", "carone", termo, require_avail=False)
        at = raspar_vtex_api("www.atacadao.com.br", "atacadao", termo, require_avail=True)
        print(f"  ✅ Extrabom ({len(eb)} itens): {[f'{x[\"name\"]} (R$ {x[\"price\"]:.2f})' for x in eb[:3]]}")
        print(f"  ✅ Carone   ({len(ca)} itens): {[f'{x[\"name\"]} (R$ {x[\"price\"]:.2f})' for x in ca[:3]]}")
        print(f"  ✅ Atacadão ({len(at)} itens): {[f'{x[\"name\"]} (R$ {x[\"price\"]:.2f})' for x in at[:3]]}\n")
        time.sleep(0.15)

    if not args.dry_run and os.path.exists("scratch/build_authentic_oct2026_catalog.py"):
        print("🔄 Atualizando js/data.js a partir da base raspada consolidada...")
        os.system(f'"{sys.executable}" scratch/build_authentic_oct2026_catalog.py')

if __name__ == "__main__":
    main()
