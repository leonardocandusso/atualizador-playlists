require("dotenv").config();
const express = require("express");

const SpotifyAPI = require("spotify-web-api-node");

const spotifyApi = new SpotifyAPI({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: "http://127.0.0.1:3000/callback",
});

const app = express();

app.get("/callback", (requisicao, resposta) => {
  resposta.send("Olá! Aqui está é Spotify");
});

// --- LOGIN ---

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

const PORTA = 3000;
app.listen(PORTA, () => {
  console.log(`teste spotify ${PORTA}...`);
});
