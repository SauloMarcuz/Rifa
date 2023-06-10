var selectedNumbers = [];
var participants = [];

function toggleSelected(number) {
  var element = document.getElementById(number);
  if (element.classList.contains('selected')) {
    element.classList.remove('selected');
    var index = selectedNumbers.indexOf(number);
    if (index !== -1) {
      selectedNumbers.splice(index, 1);
    }
  } else {
    element.classList.add('selected');
    selectedNumbers.push(number);
  }
}

function submitRaffleForm() {
  var name = document.getElementById('name').value;

  if (name === '') {
    alert('Por favor, digite seu nome.');
    return;
  }

  if (selectedNumbers.length === 0) {
    alert('Por favor, selecione pelo menos um número.');
    return;
  }

  var participant = {
    name: name,
    numbers: selectedNumbers
  };

  participants.push(participant);

  updateParticipantsList();

  // Limpar seleção de números e nome
  selectedNumbers = [];
  document.getElementById('name').value = '';
  clearNumberSelection();

  alert('Confirmação registrada com sucesso.');
}

function clearNumberSelection() {
  var numberElements = document.getElementsByClassName('number');
  for (var i = 0; i < numberElements.length; i++) {
    var number = numberElements[i].id;
    if (selectedNumbers.includes(number)) {
      numberElements[i].classList.remove('selected');
    }
  }
}

function updateParticipantsList() {
  var participantsList = document.getElementById('participants');
  participantsList.innerHTML = '';

  for (var i = 0; i < participants.length; i++) {
    var participant = participants[i];
    var listItem = document.createElement('li');
    listItem.classList.add('list-item');
    listItem.innerText = participant.name + ': ' + participant.numbers.join(', ');
    participantsList.appendChild(listItem);
  }
}

window.onload = function () {
  var numbersContainer = document.querySelector('.numbers-container');

  for (var i = 1; i <= 100; i++) {
    var numberDiv = document.createElement('div');
    numberDiv.classList.add('number');
    numberDiv.id = i;
    numberDiv.innerText = i;
    numberDiv.onclick = function () {
      toggleSelected(this.id);
    };
    numbersContainer.appendChild(numberDiv);
  }
};
