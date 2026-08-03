/* 
   components.js
   Carrega os parciais de nav, header (hero) e footer via fetch
   e injeta em qualquer página que tenha os placeholders abaixo:

   <div id="nav-placeholder"></div>
   <div id="header-placeholder"></div>
   ... <main> específico de cada página ... 
   <div id="footer-placeholder"></div>

   O título do hero é definido em cada página através do atributo
   data-header-title="" na tag <body>

   IMPORTANTE: por usar fetch() para carregar os arquivos .html,
   este site precisa ser servido por um servidor local
   (extensão Live Server),
   pois abrir os arquivos direto (file://) bloqueia o fetch.
*/

async function carregarParcial(c,s){
const d=document.querySelector(s); if(!d)return;
const m={'partials/nav.html':`<nav class="navbar">
  <div class="container navbar__inner">
    <a href="index.html" class="navbar__brand">
      <img src="assets/icone_pet.png" alt="Ícone PET Computação" class="navbar__logo-icon">
      <span class="navbar__logo-text"><strong>pet</strong><span>computação</span></span>
    </a>

    <button class="navbar__toggle" id="navToggle" aria-label="Abrir menu" aria-expanded="false" aria-controls="navMenu">
      <span></span><span></span><span></span>
    </button>

    <ul class="navbar__menu" id="navMenu">
      <li><a href="index.html" data-nav="projetos">Projetos</a></li>
      <li><a href="membros.html" data-nav="membros">Membros</a></li>
      <li><a href="sobre.html" data-nav="sobre">Sobre nós</a></li>
    </ul>
  </div>
</nav>
`,'partials/header.html':`<header class="hero">
  <img src="assets/banner_pet.jpg" alt="Equipe do PET Computação reunida para uma foto" class="hero__image">
  <div class="hero__overlay"></div>
  <h1 class="hero__title" id="heroTitle"></h1>
</header>
`,'partials/footer.html':`<footer class="footer">
  <div class="footer-container">
        <div class="footer-esquerda">
            <div class="logo-area">
                <img src="assets/icone_pet.png" alt="PET Computação" class="logo-pet">

                <div class="logo-texto">
                    <h2>pet</h2>
                    <p>Computação</p>
                </div>
            </div>

            <div class="redes">
                <a href="#"><i class="bi bi-facebook"></i></a>
                <a href="#"><i class="bi bi-instagram"></i></a>
                <a href="#"><i class="bi bi-twitter-x"></i></a>
                <a href="#"><i class="bi bi-linkedin"></i></a>
            </div>
        </div>

        <div class="footer-info">
            <div class="info">
                <i class="bi bi-envelope-fill"></i>
                <p>petcomp@icmc.usp.br</p>
            </div>

            <div class="info">
                <i class="bi bi-geo-alt-fill"></i>
                <p>
                    Av. Trab. São Carlense, 400 - São Carlos/SP Bloco 1, sala 1-103 do ICMC
                </p>
            </div>
        </div>

        <div class="footer-logos">
            <img src="assets/logo_icmc.png" alt="ICMC">
            <img src="assets/logo_usp.png" alt="USP">
        </div>
    </div>
</footer>

`};
d.innerHTML=m[c]||'';
}
function marcarLinkAtivo() {
  const paginaAtual = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__menu a').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === paginaAtual) {
      link.classList.add('is-active');
    }
  });
}

function ativarMenuMobile() {
  const botao = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');
  if (!botao || !menu) return;

  botao.addEventListener('click', () => {
    const aberto = menu.classList.toggle('is-open');
    botao.classList.toggle('is-open', aberto);
    botao.setAttribute('aria-expanded', String(aberto));
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('is-open');
      botao.classList.remove('is-open');
      botao.setAttribute('aria-expanded', 'false');
    });
  });
}

function definirTituloHero() {
  const titulo = document.body.dataset.headerTitle;
  const elTitulo = document.getElementById('heroTitle');
  if (elTitulo && titulo) {
    elTitulo.textContent = titulo;
  }
}

function definirAnoRodape() {
  const el = document.getElementById('anoAtual');
  if (el) el.textContent = new Date().getFullYear();
}

async function inicializarLayout() {
  await Promise.all([
    carregarParcial('partials/nav.html', '#nav-placeholder'),
    carregarParcial('partials/header.html', '#header-placeholder'),
    carregarParcial('partials/footer.html', '#footer-placeholder'),
  ]);

  marcarLinkAtivo();
  ativarMenuMobile();
  definirTituloHero();
  definirAnoRodape();

  // Avisa as demais páginas que o layout terminou de carregar,
  // caso precisem esperar o header antes de rodar algo.
  document.dispatchEvent(new CustomEvent('layout:pronto'));
}

document.addEventListener('DOMContentLoaded', inicializarLayout);
