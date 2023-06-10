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

  var participantItem = document.createElement('li');
  participantItem.textContent = participant.name + ': ' + participant.numbers.join(', ');

  var participantsList = document.getElementById('participants');
  participantsList.appendChild(participantItem);

  // Limpar seleção e nome
  var numberElements = document.getElementsByClassName('number');
  for (var i = 0; i < numberElements.length; i++) {
    var numberElement = numberElements[i];
    if (numberElement.classList.contains('selected')) {
      numberElement.classList.remove('selected');
    }
  }
  document.getElementById('name').value = '';
  selectedNumbers = [];
}
