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

    resposta.redirect("/");
  } catch (erro) {
    console.log("Ops, deu um problema:", erro);
    resposta.send("Houve um erro na comunicação.");
  }
});

router.get("/teste-pesquisa", async (requisicao, resposta) => {
  try {
    const youtube = google.youtube({ version: "v3", auth: clienteYouTube });

    const respostaPesquisa = await youtube.search.list({
      part: "snippet",
      q: "Vou Investir em Você", // Depois vamos deixar isso dinâmico!
      type: "video",
      maxResults: 1,
    });

    console.log(
      `O vídeo encontrado foi: ${respostaPesquisa.data.items[0].snippet.title} (ID: ${respostaPesquisa.data.items[0].id.videoId})`,
    );
    resposta.send();
  } catch (erro) {
    console.log("Ops, deu um problema:", erro);
    resposta.send("Houve um erro na comunicação.");
  }
});

router.get("/criar-playlist", async (requisicao, resposta) => {
  try {
    const youtube = google.youtube({ version: "v3", auth: clienteYouTube });

    const respostaPlaylist = await youtube.playlists.insert({
      part: "snippet,status",
      requestBody: {
        snippet: {
          title: "Minha Playlist do Node.js", // O nome da sua nova playlist!
          description: "Playlist criada automaticamente pelo meu servidor.",
        },
        status: {
          privacyStatus: "private", // Deixa privado só para você ver
        },
      },
    });

    console.log(`Playlist: ${respostaPlaylist.data.id}`);
    resposta.send(`Playlist criada`);
  } catch (erro) {
    console.log("Ops, deu um problema:", erro);
    resposta.send("Houve um erro na comunicação.");
  }
});
module.exports = router;
