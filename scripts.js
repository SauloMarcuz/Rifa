const numbersContainer = document.querySelector(".numbers-container");
const selectedList = document.getElementById("selected-list");

let selectedNumbers = [];

// Função para criar os números e adicionar o evento de clique
function createNumbers() {
  for (let i = 1; i <= 100; i++) {
    const numberElement = document.createElement("div");
    numberElement.classList.add("number");
    numberElement.textContent = i;
    numberElement.addEventListener("click", selectNumber);
    numbersContainer.appendChild(numberElement);
  }
}

// Função para selecionar um número
function selectNumber(event) {
  const number = event.target.textContent;
  
  if (!selectedNumbers.includes(number)) {
    selectedNumbers.push(number);
    event.target.classList.add("selected");
  }
}

// Função para confirmar o formulário e exibir a lista de números selecionados
function submitRaffleForm() {
  const nameInput = document.getElementById("name");

  if (nameInput.value.trim() === "") {
    alert("Por favor, digite seu nome.");
    return;
  }

  if (selectedNumbers.length === 0) {
    alert("Por favor, selecione pelo menos um número.");
    return;
  }

  nameInput.disabled = true;
  numbersContainer.classList.add("disabled");
  document.querySelector(".form-button").disabled = true;

  updateSelectedList();
  saveSelectedNumbers();
}

// Função para atualizar a lista de números selecionados
function updateSelectedList() {
  selectedList.innerHTML = "";

  selectedNumbers.forEach((number) => {
    const listItem = document.createElement("li");
    listItem.textContent = `Número: ${number} - Nome: ${document.getElementById("name").value}`;
    selectedList.appendChild(listItem);
  });
}

// Função para salvar os números selecionados no localStorage
function saveSelectedNumbers() {
  localStorage.setItem("selectedNumbers", JSON.stringify(selectedNumbers));
}

// Função para carregar os números selecionados do localStorage
function loadSelectedNumbers() {
  const savedNumbers = localStorage.getItem("selectedNumbers");

  if (savedNumbers) {
    selectedNumbers = JSON.parse(savedNumbers);

    selectedNumbers.forEach((number) => {
      const numberElement = numbersContainer.querySelector(`.number:nth-child(${number})`);
      numberElement.classList.add("selected");
    });

    updateSelectedList();
  }
}

// Chamada da função para criar os números
createNumbers();

// Chamada da função para carregar os números selecionados
loadSelectedNumbers();
