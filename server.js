require("dotenv").config();
const tmi = require("tmi.js");
const Discord = require("discord.js")
const fs = require("fs");
const express = require("express");
const nunjucks = require("nunjucks");
const routes  = require("./routes");
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
server.listen(3333, () => {
  return console.log("o server está on na porta 3333!");
});
client.on("connected", (endereco, porta) => {
  console.log("O bot ta on!");
});

// configurando bot discord.
const bot = new Discord.Client()

bot.login(process.env.DISCORD_TOKEN)

bot.on("ready", () => {
  console.log("discord bot ta on")
})
// let prefix = "!"
// let avatars = [
//   'https://imagem.natelinha.uol.com.br/grande/faustaocomendo_86b41c9ca68c6778195f5f5d9dc659a2d54cd81a.jpeg',
//   'https://contigo.uol.com.br/images/large/2020/09/26/danca-dos-famosos-clima-e-de-nervosismo-nos-bastidores-do-quadro-do-faustao-1268451.jpg',
//   'https://static1.purepeople.com.br/articles/6/27/65/96/@/3142139-faustao-repetiu-uma-blusa-no-domingao-d-624x600-1.jpg',
//   'https://static.ndonline.com.br/2020/02/fausto-17022020095816311.jpeg'
// ]
// let frases = [
//   'OLOCO!',
//   'TA PEGANDO FOGO BICHO!',
//   'Essa fera ai, meu!',
//   'Olha o tamanho da criança',
//   'Voltamos já com vídeo cassetadas!'
// ]
// bot.on("message", (msg) => {
//   let randomAvatar = Math.floor(Math.random() * (3 - 0 + 1)) + 0;
//   let randomFrase = Math.floor(Math.random() * (4 - 0 + 1)) + 0;
//   if(msg.content == `${prefix}faustão`){
//     msg.channel.fetchWebhooks(webhook => {
      
//     })
//     msg.channel.createWebhook('Faustão', {
//       avatar:avatars[randomAvatar]
//     }).then(webhook => {
//       webhook.send(frases[randomFrase], {
//         username:'Faustão',
//         avatar:avatars[randomAvatar],
//       })
//     })
//   }
// })
