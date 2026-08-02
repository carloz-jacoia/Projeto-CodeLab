# Site PET Computação

Site em HTML, CSS e JavaScript para o projeto do Codelab.

## Como rodar

Como o `nav`, o `header` e o `footer` são carregados via `fetch()` a partir de
arquivos `.html` separados (pasta `partials/`), o navegador bloqueia isso
por CORS, então não é possível abrir o `index.html` clicando duas vezes nele. 
É preciso servir os arquivos por um servidor local, ou acesse [este link](https://carloz-jacoia.github.io/Projeto-CodeLab/).

## Estrutura de pastas

```
site/
├── index.html          → página inicial
├── membros.html         → página "Membros"
├── sobre.html            → página "Sobre nós"
│
├── partials/             → pedaços de HTML reaproveitados em todas as páginas
│   ├── nav.html           (barra de menu)
│   ├── header.html        (banner/hero)
│   └── footer.html        (rodapé)
│
├── css/
│   ├── style.css          → variáveis de cor, reset, nav, header, footer (compartilhado)
│   ├── home.css           → só da index.html
│   ├── membros.css        → só da membros.html
│   └── sobre.css          → só da sobre.html
│
├── js/
│   ├── components.js      → injeta nav/header/footer em qualquer página
│   ├── home.js             → lê data/atividades.json
│   ├── membros.js          → lê data/membros.json
│   └── sobre.js            → lê data/PET.json
│
├── data/                  → os JSONs fornecidos 
│                              
└── assets/                → imagens fornecidas
```
