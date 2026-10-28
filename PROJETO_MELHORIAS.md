# Projeto de Modernização & Simplificação: Economiza Colina

**Data:** Outubro de 2026  
**Localidade:** Colina de Laranjeiras & Imediações, Serra / ES  
**Objetivo:** Deixar o aplicativo leve, intuitivo e acessível para qualquer pessoa (incluindo idosos e leigos), garantindo atualizações automáticas e fluxo de inserção de promoções em 4 passos rápidos (Foto, Preço, Data e Supermercado) com atualização imediata da tela.

---

## 1. Diagnóstico: Por que o aplicativo não atualizava automaticamente?

1. **Bug de Cache no Service Worker (`sw.js`)**:
   - `data.js` (onde ficam os preços e encartes) estava em cache estático `Cache-First`.
   - Apenas `.html` e `app.js` buscavam na rede. Como o `data.js` estava salvo no cache local do dispositivo, ele nunca baixava novas versões.
2. **Ausência de Cabeçalhos HTTP no Netlify (`netlify.toml`)**:
   - Faltavam diretivas `Cache-Control: no-cache, no-store, must-revalidate` para `sw.js` e `data.js`.
3. **Falta de Parâmetros de Versão (Cache-Busting)**:
   - Scripts eram carregados sem hash de versão (`data.js` em vez de `data.js?v=...`).
4. **Isolamento dos Envios**:
   - Os envios comunitários ficavam presos no `localStorage` do celular de quem enviou, não sincronizando com o servidor nem com os outros vizinhos.

---

## 2. Redesign: Interface Mais Enxuta e Sem Poluição

- **Remoção de excessos**: Fora banners de vídeo repetitivos, pontuação de gamificação no topo, opções técnicas de scrapers/APIs e caixas pesadas de colar listas inteiras de compras na página inicial.
- **Foco direto**:
  - Barra de busca limpa no topo ("O que você procura hoje?").
  - Categorias visuais diretas (Hortifrúti, Carnes, Bebidas, Mercearia, Limpeza).
  - Cards de produtos focados no menor preço e na economia.
  - Botão fixo grande e evidente: **"📸 Tirar Foto e Publicar Preço"**.

---

## 3. Novo Fluxo Simples de Inserção de Promoção

Projetado para ser feito em menos de 20 segundos por qualquer pessoa:

1. **📸 Tirar Foto**: Toca no botão e a câmera do celular abre direto; confirma com miniatura visível.
2. **💰 Digitar o Preço**: Campo grande em destaque que já abre o teclado numérico do celular (ex: R$ 19,90).
3. **📅 Data**: Já vem preenchida com **"Hoje"** automaticamente.
4. **🏬 Supermercado**: Grade com 7 botões grandes e coloridos dos mercados do bairro (Carone, Extrabom, Atacadão, BH, Casagrande, Assaí, Atacado Vem) — seleção com 1 toque.
5. **✨ Atualização Imediata**: Ao clicar em salvar, o card aparece instantaneamente no topo da tela com a foto e o preço!

---

## 4. Fases de Execução

- **Fase 1**: Correção do Service Worker, cache Netlify e auto-refresh de dados.
- **Fase 2**: Limpeza visual e simplificação do layout para eliminar ruídos.
- **Fase 3**: Criação do novo modal simples de publicação com câmera direta e botões táteis.
- **Fase 4**: Conexão da atualização imediata no front com persistência e testes.
