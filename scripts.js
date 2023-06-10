function submitRaffleForm() {
  var name = document.getElementById('name').value;

  // Cria um objeto com os números selecionados e o nome
  var data = {
    selectedNumbers: selectedNumbers,
    name: name
  };

  // Converte o objeto para JSON
  var jsonData = JSON.stringify(data);

  // Faz uma solicitação HTTP POST para o GitHub API
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://api.github.com/repos/SEU_USUARIO/SEU_REPOSITORIO/contents/respostas.json', true);
  xhr.setRequestHeader('Authorization', 'Bearer SEU_TOKEN_DE_AUTORIZACAO');

  xhr.onload = function() {
    if (xhr.status === 201) {
      alert('Respostas enviadas com sucesso!');
    } else {
      alert('Erro ao enviar as respostas. Por favor, tente novamente.');
    }
  };

  xhr.send(JSON.stringify({
    message: 'Atualizar respostas.json',
    content: btoa(jsonData)
  }));
}
