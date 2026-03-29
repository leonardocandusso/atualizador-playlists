// ==========================================
// BLOCO 1: IMPORTAÇÕES
// ==========================================

const express = require("express");
const router = express.Router();
const { google } = require("googleapis");

// ==========================================
// BLOCO 2: CONFIGURAÇÕES
// Inicialização de variáveis globais e conexões.
// ==========================================

const clienteYouTube = new google.auth.OAuth2(
  process.env.YOUTUBE_CLIENT_ID,
  process.env.YOUTUBE_CLIENT_SECRET,
  "http://127.0.0.1:3000/callback-youtube",
);

// ==========================================
// BLOCO 3: ROTAS
// ==========================================

router.get("/login-youtube", (requisicao, resposta) => {
  const linkDeLogin = clienteYouTube.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/youtube"],
  });
  resposta.redirect(linkDeLogin);
});

router.get("/callback-youtube", async (requisicao, resposta) => {
  try {
    const codigoGoogle = requisicao.query.code;
    const { tokens } = await clienteYouTube.getToken(codigoGoogle);
    clienteYouTube.setCredentials(tokens);

    console.log(tokens.access_token);

    resposta.send(
      "Login no YouTube realizado com sucesso! Olhe o seu terminal.",
    );
  } catch (erro) {
    console.log("Ops, deu um problema:", erro);
    resposta.send("Houve um erro na comunicação.");
  }
});

module.exports = router;
