const selectedNumbers = [];

// Função para atualizar a exibição dos números selecionados
function updateSelectedNumbers() {
  const numbersContainer = document.querySelector('.numbers-container');
  numbersContainer.innerHTML = '';

  for (let i = 1; i <= 100; i++) {
    const numberDiv = document.createElement('div');
    numberDiv.textContent = i;
    numberDiv.classList.add('number');

    if (selectedNumbers.includes(i)) {
      numberDiv.classList.add('selected');
      numberDiv.setAttribute('disabled', 'true');
    } else {
      numberDiv.addEventListener('click', () => selectNumber(i));
    }

    numbersContainer.appendChild(numberDiv);
  }
}

// Função para selecionar um número
function selectNumber(number) {
  selectedNumbers.push(number);
  updateSelectedNumbers();
}

// Função para confirmar a seleção do número
function submitRaffleForm() {
  saveSelectedNumbers();
  document.querySelector('.participant-form').style.display = 'none';
  displaySelectedNumbers();
}

// Função para salvar os nomes e números em um arquivo JSON localmente
function saveSelectedNumbers() {
  const data = {
    nomes: [],
    numeros: selectedNumbers,
  };

  // Verifica se o nome está preenchido
  const nameInput = document.getElementById("name");
  if (nameInput.value.trim() !== "") {
    data.nomes.push(nameInput.value);
  }

  // Lê o arquivo respostas.json (caso exista)
  let fileData = [];
  if (fs.existsSync('respostas.json')) {
    const fileContent = fs.readFileSync('respostas.json', 'utf8');
    fileData = JSON.parse(fileContent);
  }

  // Adiciona os novos dados à lista existente
  fileData.push(data);

  // Escreve os dados atualizados no arquivo respostas.json
  fs.writeFileSync('respostas.json', JSON.stringify(fileData, null, 2));
}

// Função para exibir a lista de nomes e números selecionados
function displaySelectedNumbers() {
  const selectedNumbersList = document.createElement('ul');
  selectedNumbersList.classList.add('selected-numbers-list');

  // Lê o arquivo respostas.json
  fs.readFile('respostas.json', 'utf8', (err, fileContent) => {
    if (err) {
      console.error(err);
      return;
    }

    const fileData = JSON.parse(fileContent);

    fileData.forEach((data) => {
      const listItem = document.createElement('li');
      const name = data.nomes.length > 0 ? data.nomes[0] : 'N/A';
      const numbers = data.numeros.join(', ');

      listItem.textContent = `${name}: ${numbers}`;
      selectedNumbersList.appendChild(listItem);
    });

    document.body.appendChild(selectedNumbersList);
  });
}

// Função para inicializar a página
function initializePage() {
  updateSelectedNumbers();
}

initializePage();
