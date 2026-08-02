
const ICONE_ALVO_SVG = `
  <svg class="icone-alvo" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6"/>
    <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="1.6"/>
    <circle cx="12" cy="12" r="1.6" fill="currentColor"/>
  </svg>`;

function criarItemAndamento(atividade) {
  const li = document.createElement('li');
  li.innerHTML = `
    ${ICONE_ALVO_SVG}
    <div>
      <h4>${atividade.nome}</h4>
      ${atividade.descricao && atividade.descricao !== '...' ? `<p>${atividade.descricao}</p>` : ''}
    </div>
  `;
  return li;
}

function criarCardAtividade(atividade) {
  const card = document.createElement('article');
  card.className = 'card card-atividade';

  const periodo = atividade.inicio && atividade.fim
    ? `${atividade.inicio} - ${atividade.fim}`
    : '';

  card.innerHTML = `
    <div class="card-atividade__imagem-slot"></div>
    <div class="card-atividade__corpo">
      <p class="card-atividade__titulo">${atividade.nome}</p>
      ${periodo ? `<p class="card-atividade__data">${periodo}</p>` : ''}
    </div>
  `;

  const slot = card.querySelector('.card-atividade__imagem-slot');
  const img = new Image();
  img.className = 'card-atividade__imagem';
  img.alt = atividade.nome;
  img.loading = 'lazy';

  img.addEventListener('error', () => {
    slot.innerHTML = `
      <div class="card-atividade__imagem-fallback">
        <img src="assets/icone_pet.png" alt="">
      </div>`;
  });

  img.src = atividade.imagem;
  slot.appendChild(img);

  return card;
}

async function carregarAtividades() {
  const listaAndamento = document.getElementById('listaAndamento');
  const carrossel = document.getElementById('carrosselProximas');

  try {
    const resposta = await fetch('data/atividades.json');
    if (!resposta.ok) throw new Error('Não foi possível carregar atividades.json');
    const dados = await resposta.json();

    const atuais = dados.atuais || [];
    const proximas = dados.proximas || [];

    listaAndamento.innerHTML = '';
    if (atuais.length === 0) {
      listaAndamento.innerHTML = `<li class="lista-andamento__vazio">Nenhuma atividade em andamento no momento.</li>`;
    } else {
      atuais.forEach((atividade) => listaAndamento.appendChild(criarItemAndamento(atividade)));
    }

    carrossel.innerHTML = '';
    proximas.forEach((atividade) => carrossel.appendChild(criarCardAtividade(atividade)));

    configurarSetasCarrossel(carrossel);
  } catch (erro) {
    console.error(erro);
    listaAndamento.innerHTML = `<li class="lista-andamento__vazio">Erro ao carregar as atividades.</li>`;
    carrossel.innerHTML = `<p style="color:#a33;">Erro ao carregar as próximas atividades.</p>`;
  }
}

function configurarSetasCarrossel(carrossel) {
  const btnAnterior = document.getElementById('btnAnterior');
  const btnProximo = document.getElementById('btnProximo');

  function distanciaDeScroll() {
    const card = carrossel.querySelector('.card-atividade');
    if (!card) return 260;
    const estilo = getComputedStyle(carrossel);
    const gap = parseFloat(estilo.gap) || 20;
    return card.getBoundingClientRect().width + gap;
  }

  btnAnterior.addEventListener('click', () => {
    carrossel.scrollBy({ left: -distanciaDeScroll(), behavior: 'smooth' });
  });

  btnProximo.addEventListener('click', () => {
    carrossel.scrollBy({ left: distanciaDeScroll(), behavior: 'smooth' });
  });
}

document.addEventListener('DOMContentLoaded', carregarAtividades);
