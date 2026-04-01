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

router.get("/desafio-leitura", (req, res) => {
  const servidorAlvo = {
    ip: "192.168.0.15",
    status: "ativo",
    portasAbertas: [80, 443, 22, 3306],
    credenciaisVazadas: {
      bancoDeDados: {
        usuario: "admin",
        senhaHash: "xYz123#$",
      },
      ftp: {
        usuario: "visitante",
        senhaHash: "12345",
      },
    },
  };

  console.log(
    `A porta é ${servidorAlvo.portasAbertas[2]} e sua senha do banco de dados é ${servidorAlvo.credenciaisVazadas.bancoDeDados.senhaHash}`,
  );
  res.redirect("/");
});

router.get("/desafio-escrita", (req, res) => {
  const meuPerfilCyber = {
    nome: "Leonardo",
    habilidades: ["Proativo", "Fácil aprendizado", "Sempre quero ajudar"],
    projetos: {
      ferramentaPhishing: "concluido",
      scannerDeRede: "em desenvolvimento",
    },
  };

  console.log(meuPerfilCyber);
  res.redirect("/");
});

module.exports = router;
