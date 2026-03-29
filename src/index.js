require("dotenv").config();
const express = require("express");
const app = express();

// Importamos o arquivo que criamos
const rotasDeEstudo = require("./rotasDeEstudo");
const spotifyRoutes = require("./spotifyRoutes");

app.use(rotasDeEstudo);
app.use(spotifyRoutes);

app.listen(3000, () => console.log("Rodando..."));
