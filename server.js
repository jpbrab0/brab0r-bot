require("dotenv").config();
const tmi = require("tmi.js");
const Discord = require("discord.js")
const fs = require("fs");
const express = require("express");
const nunjucks = require("nunjucks");
const server = express();
server.use(express.static("public"));
const webhookClient = new Discord.WebhookClient('766120636627550208', '7C3n1sofSYyHKxQuTz4dZYHrRAN1Q6eqLx5LnPN-6vAjoMWmkbZL4sRrrw63Z4lW32mC');

// Configurando para receber dados do request.body e config das rotas da aplicação.
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// Config da template engine.
server.set("view engine", "njk");
nunjucks.configure("src/app/views", {
  express: server,
  autoescape: false,
  noCache: true,
});
server.get("/", (req, res) => {
  return res.render("index");
});
server.post("/divulgacao", (req, res) => {
  const keys = Object.keys(req.body);

  for (key of keys) {
    if (req.body[key] == "") {
      return res.send("Por favor, digite a pessoa a ser divulgada.");
    }
  }

  const { nick } = req.body;

  client.say("#jpbrab0", `!sh-so ${nick}`);
  return res.redirect("/");
});
server.post("/github", (req, res) => {
  const keys = Object.keys(req.body);

  for (key of keys) {
    if (req.body[key] == "") {
      return client.say("#jpbrab0", "https://github.com/jpbrab0");
    }
  }
  const { github } = req.body;

  client.say("#jpbrab0", `https://github.com/${github}`);

  return res.redirect("/");
});
server.post("/4Noobs", (req, res) => {
  client.say(
    "#jpbrab0",
    `Quer conteudo de desenvolvimento de qualidade e gratuito?! Conheça a He4rt devs e o 4noobs! > https://github.com/he4rt/4noobs`
  );

  return res.redirect("/");
});
server.post("/discord", (req, res) => {
  client.say(
    "#jpbrab0",
    `Entre no discord do nosso canal! \n > https://discord.gg/v6gX9dK <`
  );

  return res.redirect("/");
});
server.post("/divulgadiscord", (req, res) => {
  let message =
    "\n :red_circle: LIVE ON :red_circle: \n \n O @jpbrab0  está on na twitch.tv vai la ver ele codar o famoso js de rua! \n \n :link:  https://twitch.tv/jpbrab0";
  webhookClient.send(message, {
    username: "Divulgador das lives do jpbrab0",
    avatarURL: "https://blog.twitch.tv/assets/uploads/01-twitch-logo.jpg",
  });
  return res.redirect("/");
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
  client.say("#jpbrab0", `PogChamp ${username} invadiu a live com ${viewers} viewers!! WOW \o/ \o/ \o/ `)
});
client.on("cheer", (channel, userstate, message) => {
  client.say("#jpbrab0", `PogChamp vlw pelos bits!`)
});
client.on("subscription", (channel, username, method, message, userstate) => {
  client.say("#jpbrab0", `PogChamp ${username} deu sub! Muito obg por acreditar no meu conteúdo! `)
});
client.on("submysterygift", (channel, username, numbOfSubs, methods, userstate) => {
  client.say("#jpbrab0", `DENOnimus distribuiu ${numbOfSubs} subs no chat!`)
});
client.on("subgift", (channel, username, streakMonths, recipient, methods, userstate) => {
  client.say("#jpbrab0", `${username} distribuiu um sub para ${recipient}!`)
});
client.on("resub", (channel, username, months, message, userstate, methods) => {
  client.say("#jpbrab0", `${username} deu resub por ${months}!`)
});
// client.on("raw_message", (messageCloned, message) => {
//   if (String(message.raw).includes("custom-reward-id=f18fe744-3e7c-4176-9d9c-5ac230dd7e62")) {
//     client.say("#jpbrab0", "foi")
//   }
// });
// configurando bot discord.
const bot = new Discord.Client()

bot.login(process.env.DISCORD_TOKEN)

bot.on("ready", () => {
  console.log("discord bot ta on")
})
