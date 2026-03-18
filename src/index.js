require("dotenv").config();

// Importando a biblioteca do servidor
const express = require("express");

// 3. Inicializando o servidor
const app = express();

// 4. Criando uma "rota" (Uma porta de entrada)
// Quando alguém acessar http://127.0.0.1:3000/callback, ela responde isso:
app.get("/callback", (requisicao, resposta) => {
  resposta.send("Olá! Aqui está é spotify.");
});

// 5. Ligando o servidor e dizendo em qual porta ele deve escutar
const PORTA = 3000;
app.listen(PORTA, () => {
  console.log(`teste spotify ${PORTA}...`);
  // Só pra provar que o cofre abriu, vou imprimir uma senha fake aqui:
  // console.log("Minha senha secreta é:", process.env.SENHA_DA_PIZZARIA);
});
