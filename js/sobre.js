
function criarCardFrente(nome, descricao) {
  const card = document.createElement('article');
  card.className = 'card card-frente';
  card.innerHTML = `
    <div class="card-frente__cabecalho">
      <span class="card-frente__marcador"></span>
      <h3 class="card-frente__titulo">${nome}</h3>
    </div>
    <p class="card-frente__descricao">${descricao}</p>
  `;
  return card;
}

async function carregarSobre() {
  const tituloGrupo = document.getElementById('tituloGrupo');
  const subtituloGrupo = document.getElementById('subtituloGrupo');
  const textoSobre = document.getElementById('textoSobre');
  const gridFrentes = document.getElementById('gridFrentes');

  try {
    const resposta = await fetch('data/PET.json');
    if (!resposta.ok) throw new Error('Não foi possível carregar PET.json');
    const dados = await resposta.json();

    const info = dados.Informacoes || {};
    const frentes = dados.Frentes || {};

    tituloGrupo.textContent = info.Grupo ? `Sobre o ${info.Grupo}` : 'Sobre nós';
    subtituloGrupo.textContent = info.Subtitulo || '';

    textoSobre.innerHTML = '';
    (info.Sobre || []).forEach((paragrafo) => {
      const p = document.createElement('p');
      p.textContent = paragrafo;
      textoSobre.appendChild(p);
    });

    gridFrentes.innerHTML = '';
    Object.entries(frentes).forEach(([nome, descricao]) => {
      gridFrentes.appendChild(criarCardFrente(nome, descricao));
    });
  } catch (erro) {
    console.error(erro);
    textoSobre.innerHTML = '<p style="color:#a33;">Erro ao carregar as informações do grupo.</p>';
    gridFrentes.innerHTML = '';
  }
}

document.addEventListener('DOMContentLoaded', carregarSobre);
