require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();

const rotasDeEstudo = require("./rotasDeEstudo");
const spotifyRoutes = require("./spotifyRoutes");
const youtubeRoutes = require("./youtubeRoutes");

app.use(rotasDeEstudo);
app.use(spotifyRoutes);
app.use(youtubeRoutes);

app.get("/", (requisicao, resposta) => {
  resposta.sendFile(path.join(__dirname, "dashboard.html"));
});

app.listen(3000, () => console.log("Rodando na porta 3000..."));
