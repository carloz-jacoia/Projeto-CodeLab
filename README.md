# Site PET Computação

Este projeto consiste em um site em HTML, CSS e JavaScript para o grupo de extensão PET Computação do ICMC-USP, desenvolvido pelos alunos Carloz Jacoia e Luana Sampaio como um projeto do Codelab.

## Como executar

Como o `nav`, o `header` e o `footer` são carregados via `fetch()` a partir de
arquivos `.html` separados (pasta `partials/`), o navegador bloqueia isso
por CORS, então não é possível abrir o `index.html` clicando duas vezes nele. 
É preciso servir os arquivos por um servidor local, ou acesse [este link](https://carloz-jacoia.github.io/Projeto-Codelab/).

## Tecnologias utilizadas

Este projeto foi desenvolvido utilizando as seguintes tecnologias:

- **HTML** – Estrutura das páginas.
- **CSS** – Estilização, layout responsivo e animações.
- **JavaScript** – Manipulação do DOM, carregamento dos componentes e consumo dos arquivos JSON.
- **Fetch API** – Carregamento dinâmico dos componentes (`nav`, `header` e `footer`) e dos dados da aplicação.
- **JSON** – Armazenamento das informações exibidas nas páginas.

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

## A página
<img alt="início1" src="https://github.com/user-attachments/assets/4e0ee86a-c19b-4a3b-85d1-ddc5752038ef" />  
<img alt="início2" src="https://github.com/user-attachments/assets/b28ba8d9-860e-4a44-934c-e5e148e7416b" />  
<img alt="membros" src="https://github.com/user-attachments/assets/f389825e-e463-45ec-93a4-4985fadd527b" />  
<img alt="sobre" src="https://github.com/user-attachments/assets/54783a1e-18ab-40a0-87fa-5f19c101e9d8" />


