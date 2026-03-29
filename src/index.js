require("dotenv").config();
const express = require("express");
const app = express();

// Importamos o arquivo que criamos
const rotasDeEstudo = require("./rotasDeEstudo");
const spotifyRoutes = require("./spotifyRoutes");
const youtubeRoutes = require("./youtubeRoutes");

app.use(rotasDeEstudo);
app.use(spotifyRoutes);
app.use(youtubeRoutes);

app.listen(3000, () => console.log("Rodando..."));
