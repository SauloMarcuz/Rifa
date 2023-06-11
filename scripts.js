function submitRaffleForm() {
  // Restante do código...

  // Salvar os participantes no arquivo respostas.json usando a API do GitHub
  const jsonData = JSON.stringify(participants);
  const githubApiUrl = "https://api.github.com/repos/SauloMarcuz/rifa-isis/contents/respostas.json";
  const token = "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";

  fetch(githubApiUrl, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: "Atualizar arquivo respostas.json",
      content: btoa(jsonData),
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
}
