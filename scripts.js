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

    // Salvar os participantes no arquivo answers.json usando a API do GitHub
    const jsonData = JSON.stringify(participants);
    const githubApiUrl = "https://api.github.com/repos/SauloMarcuz/rifa-isis/contents/answers.json";
    const token = "SEU_TOKEN_DE_ACESSO_PESSOAL";

    fetch(githubApiUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "Atualizar arquivo answers.json",
        content: jsonData,
        branch: "Saulo",
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log("Dados salvos com sucesso!");
      })
      .catch(error => {
        console.error("Erro ao salvar os dados:", error);
      });
  } else {
    alert('Por favor, preencha o nome e selecione pelo menos um número.');
  }
}
