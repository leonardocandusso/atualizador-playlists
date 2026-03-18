// ==========================================
// BLOCO 1: IMPORTAÇÕES
// ==========================================

require("dotenv").config();
const express = require("express");
const SpotifyAPI = require("spotify-web-api-node");

// ==========================================
// BLOCO 2: CONFIGURAÇÕES
// Inicialização de variáveis globais e conexões.
// ==========================================

const spotifyApi = new SpotifyAPI({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: "http://127.0.0.1:3000/callback",
});

const app = express();

// ==========================================
// BLOCO 3: ROTAS
// ==========================================

app.get("/login", (requisicao, resposta) => {
  const permissoesDoSpotify = [
    "playlist-read-private",
    "playlist-read-collaborative",
  ];

  const linkDeLogin = spotifyApi.createAuthorizeURL(
    permissoesDoSpotify,
    "estado-transferidor",
  );
  resposta.redirect(linkDeLogin);
});

app.get("/callback", async (requisicao, resposta) => {
  try {
    const codigoSpotify = requisicao.query.code;
    const dadosDoSpotify =
      await spotifyApi.authorizationCodeGrant(codigoSpotify);
    const meuAccessToken = dadosDoSpotify.body.access_token;
    console.log("MEU ACCESS TOKEN É:", meuAccessToken);

    resposta.send("Troca concluída! Olhe o seu terminal.");
  } catch (erro) {
    console.log("Ops, deu um problema:", erro);
    resposta.send("Houve um erro na comunicação.");
  }
});

// ==========================================
// BLOCO 4: INICIALIZAÇÃO
// O comando de escutar a porta fica SEMPRE no final do arquivo.
// ==========================================

const PORTA = 3000;
app.listen(PORTA, () => {
  console.log(`teste porta: ${PORTA}...`);
});
