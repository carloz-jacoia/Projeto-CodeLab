
const ICONE_PESSOA_SVG = `
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.6"/>
    <path d="M4.5 20c1.2-3.6 4.2-5.5 7.5-5.5s6.3 1.9 7.5 5.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
  </svg>`;

function criarCardMembro(pessoa, papel) {
  const card = document.createElement('article');
  card.className = 'card card-membro';

  card.innerHTML = `
    <div class="card-membro__foto"></div>
    <p class="card-membro__papel">${papel}</p>
    <p class="card-membro__nome">${pessoa.nome}</p>
  `;

  const foto = card.querySelector('.card-membro__foto');
  const temImagemValida = pessoa.imagem && pessoa.imagem.startsWith('http') && pessoa.imagem !== '...';

  if (temImagemValida) {
    const img = new Image();
    img.alt = pessoa.nome;
    img.loading = 'lazy';
    img.addEventListener('error', () => {
      foto.innerHTML = ICONE_PESSOA_SVG;
    });
    img.src = pessoa.imagem;
    foto.appendChild(img);
  } else {
    foto.innerHTML = ICONE_PESSOA_SVG;
  }

  return card;
}

async function carregarMembros() {
  const grid = document.getElementById('gridMembros');

  try {
    const resposta = await fetch('data/membros.json');
    if (!resposta.ok) throw new Error('Não foi possível carregar membros.json');
    const dados = await resposta.json();

    grid.innerHTML = '';

    if (dados.responsavel) {
      grid.appendChild(criarCardMembro(dados.responsavel, 'Tutor'));
    }

    (dados.membros || []).forEach((membro) => {
      grid.appendChild(criarCardMembro(membro, 'Petiano'));
    });

    if (!grid.children.length) {
      grid.innerHTML = '<p>Nenhum membro cadastrado no momento.</p>';
    }
  } catch (erro) {
    console.error(erro);
    grid.innerHTML = '<p style="color:#a33;">Erro ao carregar os membros.</p>';
  }
}

document.addEventListener('DOMContentLoaded', carregarMembros);
