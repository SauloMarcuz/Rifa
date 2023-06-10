var selectedNumbers = [];

function toggleSelected(number) {
  var element = document.getElementById(number);
  if (element.classList.contains('selected-previously')) {
    return; // O número já foi selecionado anteriormente, não faz nada
  }
  if (element.classList.contains('selected')) {
    element.classList.remove('selected');
    var index = selectedNumbers.indexOf(number);
    if (index > -1) {
      selectedNumbers.splice(index, 1);
    }
  } else {
    element.classList.add('selected');
    selectedNumbers.push(number);
  }
}

var numbersContainer = document.querySelector('.numbers-container');

for (var i = 1; i <= 100; i++) {
  var numberDiv = document.createElement('div');
  numberDiv.setAttribute('class', 'number');
  numberDiv.setAttribute('id', i);
  numberDiv.setAttribute('onclick', 'toggleSelected(' + i + ')');
  numberDiv.innerText = i;
  numbersContainer.appendChild(numberDiv);
}
