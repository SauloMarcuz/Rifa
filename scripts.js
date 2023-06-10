var selectedNumbers = [];

function toggleSelected(number) {
  var index = selectedNumbers.indexOf(number);
  if (index > -1) {
    selectedNumbers.splice(index, 1);
    document.getElementById(number).classList.remove('selected');
  } else {
    selectedNumbers.push(number);
    document.getElementById(number).classList.add('selected');
  }
}

function generateNumbers() {
  var numbersContainer = document.querySelector('.numbers-container');
  numbersContainer.innerHTML = '';

  for (var i = 1; i <= 100; i++) {
    var numberDiv = document.createElement('div');
    numberDiv.setAttribute('class', 'number');
    numberDiv.setAttribute('id', i);
    numberDiv.setAttribute('onclick', 'toggleSelected(' + i + ')');
    numberDiv.innerText = i;
    numbersContainer.appendChild(numberDiv);
  }
}

function submitRaffleForm() {
  var name = document.getElementById('name').value;
  if (selectedNumbers.length === 0 || name === '') {
    alert('Por favor, selecione um número e informe o nome.');
    return;
  }

  var participant = {
    name: name,
    numbers: selectedNumbers
  };

  var participantsList = [];
  if (localStorage.getItem('participants')) {
    participantsList = JSON.parse(localStorage.getItem('participants'));
  }
  participantsList.push(participant);
  localStorage.setItem('participants', JSON.stringify(participantsList));

  var participantListContainer = document.getElementById('participant-list');
  var participantItem = document.createElement('li');
  participantItem.innerText = 'Nome: ' + name + ', Números: ' + selectedNumbers.join(', ');
  participantListContainer.appendChild(participantItem);

  alert('Registro realizado com sucesso!');

  // Limpar os campos após o registro
  selectedNumbers = [];
  document.getElementById('name').value = '';
  var numberElements = document.getElementsByClassName('number');
  for (var i = 0; i < numberElements.length; i++) {
    numberElements[i].classList.remove('selected');
  }
}

window.onload = function() {
  generateNumbers();

  var participantsList = localStorage.getItem('participants');
  if (participantsList) {
    participantsList = JSON.parse(participantsList);
    var participantListContainer = document.getElementById('participant-list');
    participantsList.forEach(function(participant) {
      var participantItem = document.createElement('li');
      participantItem.innerText = 'Nome: ' + participant.name + ', Números: ' + participant.numbers.join(', ');
      participantListContainer.appendChild(participantItem);
    });
  }
};
