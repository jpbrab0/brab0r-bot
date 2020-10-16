require("dotenv").config();
const tmi = require("tmi.js");
const Discord = require("discord.js")
const fs = require("fs");
const express = require("express");
const nunjucks = require("nunjucks");
const routes  = require("./routes");
const { use } = require("./routes");
const server = express();
server.use(express.static("public"));

// Configurando para receber dados do request.body e config das rotas da aplicação.
server.use(routes)
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// Config da template engine.
server.set("view engine", "njk");
nunjucks.configure("src/app/views", {
  express: server,
  autoescape: false,
  noCache: true,
});
server.listen(3333, () => {
  return console.log("o server está on na porta 3333!");
});
// Definir opções de configuração
const opts = {
  identity: {
    username: "brab0bot",
    password: process.env.TOKEN,
  },
  channels: ["jpbrab0"],
};
// Cria um cliente tmi com  nossas opções
const client = new tmi.client(opts);

client.connect();
fs.readdirSync(`${__dirname}/commands`)
  .filter((file) => file.slice(-3) === '.js')
  .forEach((file) => {
    client.on('message', (target, context, message, isBot) => {
      if (isBot) return;
      require(`./commands/${file}`).default(client, target, context, message);
    });
});
client.on("connected", (endereco, porta) => {
  console.log("O bot ta on!");
});
client.on("raided", (channel, username, viewers) => {
  client.say("#jpbrab0", `PogChamp ${username} invadiu a live com ${viewers}!! WOW \o/ \o/ \o/ `)
});
client.on("part", (channel, username, self) => {
  console.log(username + ' saiu da live...')
});
client.on("join", (channel, username, self) => {
  console.log(username + ' entrou na live!')
});
client.on("cheer", (channel, userstate, message) => {
  client.say("#jpbrab0", `PogChamp vlw pelos bits!`)
});
client.on("subscription", (channel, username, method, message, userstate) => {
  client.say("#jpbrab0", `PogChamp ${username} deu sub! Muito obg por acreditar no meu conteúdo! `)
});
client.on("submysterygift", (channel, username, numbOfSubs, methods, userstate) => {
  client.say("#jpbrab0", `DENOnimus distribuiu ${numbOfSubs} no chat!`)
});
client.on("subgift", (channel, username, streakMonths, recipient, methods, userstate) => {
  client.say("#jpbrab0", `${recipient} distribuiu um sub para ${username}!`)
});
client.on("resub", (channel, username, months, message, userstate, methods) => {
  client.say("#jpbrab0", `${username} deu resub por ${months}!`)
});
// configurando bot discord.
const bot = new Discord.Client()

bot.login(process.env.DISCORD_TOKEN)

bot.on("ready", () => {
  console.log("discord bot ta on")
})