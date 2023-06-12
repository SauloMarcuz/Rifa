const formEntrada = document.getElementById('name');
const numberContainer = document.querySelector('.numbers-container');
const participanteLista = document.getElementById('participant-list');

const numeros = Array.from({ length: 100 }, (_, i) => i + 1);
let numerosSelecionados = [];
let participantes = [];

function atualizarNumerosSelecionados() {
  numberContainer.innerHTML = '';

  numeros.forEach(numero => {
    const numeroElemento = document.createElement('span');
    numeroElemento.classList.add('number');
    numeroElemento.textContent = numero;

    if (numerosSelecionados.includes(numero) || isNumeroUtilizado(numero)) {
      numeroElemento.classList.add('selected');
      numeroElemento.setAttribute('selected', true);
    }

    numeroElemento.addEventListener('click', () => {
      if (!numeroElemento.classList.contains('selected')) {
        numeroElemento.classList.add('selected');
        numerosSelecionados.push(numero);
      } else {
        numeroElemento.classList.remove('selected');
        numerosSelecionados = numerosSelecionados.filter(n => n !== numero);
      }
    });

    numberContainer.appendChild(numeroElemento);
  });
}

function isNumeroUtilizado(numero) {
  for (const participante of participantes) {
    if (participante.numeros.includes(numero)) {
      return true;
    }
  }
  return false;
}

function atualizarListaParticipantes() {
  participanteLista.innerHTML = '';

  participantes.forEach(participante => {
    const itemLista = document.createElement('li');
    itemLista.classList.add('list-item');
    itemLista.textContent = `${participante.nome} - Números: ${participante.numeros.join(', ')}`;

    participanteLista.appendChild(itemLista);
  });
}

function submitRaffleForm() {
  const nome = formEntrada.value.trim();

  if (nome && numerosSelecionados.length > 0) {
    const participante = {
      nome: nome,
      numeros: numerosSelecionados
    };

    participantes.push(participante);
    formEntrada.value = '';
    numerosSelecionados = [];

    atualizarNumerosSelecionados();
    atualizarListaParticipantes();

    const jsonData = JSON.stringify(participantes);
    const githubApiUrl = 'https://api.github.com/repos/SauloMarcuz/rifa-isis/contents/answers.json';
    const githubToken = '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';

    fetch(githubApiUrl, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${githubToken}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Atualizar arquivo answers.json',
        content: btoa(jsonData),
        branch: 'Saulo',
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Dados salvos com sucesso!');
      })
      .catch(error => {
        console.error('Erro ao salvar os dados:', error);
      });
  }
}
