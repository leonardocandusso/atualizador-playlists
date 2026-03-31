// ==========================================
// BLOCO 1: IMPORTAÇÕES
// ==========================================

const express = require("express");
const router = express.Router();
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

// ==========================================
// BLOCO 3: ROTAS
// ==========================================

router.get("/login", (requisicao, resposta) => {
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

router.get("/callback", async (requisicao, resposta) => {
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

router.get("/playlist/:id", async (requisicao, resposta) => {
  try {
    const idPlaylist = requisicao.params.id;
    const musicasPlaylist = await spotifyApi.getPlaylist(idPlaylist);

    const listaDeMusicas = musicasPlaylist.body.items.items;

    listaDeMusicas.forEach((musica, posicao) => {
      console.log(
        `A música na posição ${posicao} é a ${musica.item.name} - ${musica.item.artists[0].name}`,
      );
    });

    resposta.send("Músicas carregadas com sucesso! Olhe o seu terminal.");
  } catch (erro) {
    console.log("Ops, deu um problema:", erro);
    resposta.send("Houve um erro na comunicação.");
  }
});

module.exports = router;
