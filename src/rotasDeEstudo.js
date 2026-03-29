const express = require("express");
const router = express.Router();

router.get("/sobre", (requisicao, resposta) => {
  resposta.send("Criado por Leonardo Candusso, com ajuda do GEMINI");
});

router.get("/papagio", (requisicao, resposta) => {
  const palavraSecreta = requisicao.query.mensagem;
  resposta.send(`O papagio repete: ${palavraSecreta}`);
});

router.get("/perfil/:nome", (requisicao, resposta) => {
  const nomeUsuario = requisicao.params.nome;
  resposta.send(`Bem-vindo ao perfil super secreto de: ${nomeUsuario}`);
});

router.get("/bonito", (requisicao, resposta) => {
  resposta.send(
    "<h1>Olá, Mundo!</h1> <p>Este é o meu servidor <b>Express</b>.</p>",
  );
});

module.exports = router;
