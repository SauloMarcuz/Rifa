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
    } else {
        alert('Por favor, preencha o nome e selecione pelo menos um número.');
    }
}

atualizarNumerosSelecionados();
atualizarListaParticipantes();
