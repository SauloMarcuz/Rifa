const numbersContainer = document.querySelector('.numbers-container');
const participantList = document.getElementById('participant-list');
const formInput = document.getElementById('name');

const numbers = Array.from({ length: 100 }, (_, i) => i + 1);
let selectedNumbers = [];
let participants = [];

// Função para atualizar a lista de números selecionados
function updateSelectedNumbers() {
  numbersContainer.innerHTML = '';

  numbers.forEach(number => {
    const numberElement = document.createElement('div');
    numberElement.classList.add('number');
    numberElement.textContent = number;

    if (selectedNumbers.includes(number) || isNumberTaken(number)) {
      numberElement.classList.add('selected');
      numberElement.setAttribute('disabled', true);
    }

    numberElement.addEventListener('click', () => {
      if (!numberElement.classList.contains('selected')) {
        numberElement.classList.add('selected');
        selectedNumbers.push(number);
      } else {
        numberElement.classList.remove('selected');
        selectedNumbers = selectedNumbers.filter(n => n !== number);
      }
    });

    numbersContainer.appendChild(numberElement);
  });
}

// Função para verificar se um número já foi selecionado por outro participante
function isNumberTaken(number) {
  for (const participant of participants) {
    if (participant.numbers.includes(number)) {
      return true;
    }
  }
  return false;
}

// Função para atualizar a lista de participantes
function updateParticipantList() {
  participantList.innerHTML = '';

  participants.forEach(participant => {
    const listItem = document.createElement('li');
    listItem.classList.add('list-item');
    listItem.textContent = `${participant.name} - Números: ${participant.numbers.join(', ')}`;

    participantList.appendChild(listItem);
  });
}

// Função para confirmar a participação
function submitRaffleForm() {
  const name = formInput.value.trim();

  if (name && selectedNumbers.length > 0) {
    const participant = {
      name: name,
      numbers: selectedNumbers
    };

    participants.push(participant);
    formInput.value = '';
    selectedNumbers = [];

    updateSelectedNumbers();
    updateParticipantList();

    // Salvar os participantes no arquivo respostas.json
    const jsonParticipants = JSON.stringify(participants);
    const blob = new Blob([jsonParticipants], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'https://github.com/SauloMarcuz/rifa-isis/blob/Saulo/respostas.json';
    link.click();
  } else {
    alert('Por favor, preencha o nome e selecione pelo menos um número.');
  }
}

// Inicialização da página
updateSelectedNumbers();
