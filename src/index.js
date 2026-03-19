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

app.get("/", (requisicao, resposta) => {
  resposta.send(`
    <div style="font-family: Arial, sans-serif; text-align: center; margin-top: 50px;">
      <h1>Bem-vindo ao Atualizador de Playlists 🎧</h1>
      <p>Transfira suas músicas entre Spotify e YouTube facilmente.</p>
      <br>
      <a href="/login" style="padding: 10px 20px; background-color: #1DB954; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
        Entrar com o Spotify
      </a>
    </div>
  `);
});

app.get("/callback", async (requisicao, resposta) => {
  try {
    const codigoSpotify = requisicao.query.code;
    const dadosDoSpotify =
      await spotifyApi.authorizationCodeGrant(codigoSpotify);
    const meuAccessToken = dadosDoSpotify.body.access_token;
    console.log("MEU ACCESS TOKEN É:", meuAccessToken);

    spotifyApi.setAccessToken(meuAccessToken);
    const minhasPlaylists = await spotifyApi.getUserPlaylists();
    console.log("Total de playlists que eu tenho:", minhasPlaylists.body.total);
    // console.log(minhasPlaylists.body.items[0].name);

    const listaDePlaylists = minhasPlaylists.body.items;
    listaDePlaylists.forEach((playlist, posicao) => {
      console.log(
        `A playlist na posição ${posicao} é a ${playlist.name} - ID: ${playlist.id}`,
      );
    });

    resposta.send("Troca concluída! Olhe o seu terminal.");
  } catch (erro) {
    console.log("Ops, deu um problema:", erro);
    resposta.send("Houve um erro na comunicação.");
  }
});

// ESTUDO

app.get("/sobre", (requisicao, resposta) => {
  resposta.send("Criado por Leonardo Candusso, com ajuda do GEMINI");
});

app.get("/papagio", (requisicao, resposta) => {
  const palavraSecreta = requisicao.query.mensagem;
  resposta.send(`O papagio repete: ${palavraSecreta}`);
});

app.get("/perfil/:nome", (requisicao, resposta) => {
  const nomeUsuario = requisicao.params.nome;
  resposta.send(`Bem-vindo ao perfil super secreto de: ${nomeUsuario}`);
});

app.get("/bonito", (requisicao, resposta) => {
  resposta.send(
    "<h1>Olá, Mundo!</h1> <p>Este é o meu servidor <b>Express</b>.</p>",
  );
});

// ==========================================
// BLOCO 4: INICIALIZAÇÃO
// O comando de escutar a porta fica SEMPRE no final do arquivo.
// ==========================================

const PORTA = 3000;
app.listen(PORTA, () => {
  console.log(`teste porta: ${PORTA}...`);
});
