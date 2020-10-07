require("dotenv").config();
const tmi = require("tmi.js");
const fs = require("fs");
const express = require("express")
const nunjucks = require("nunjucks")
const server = express()
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

server.use(express.static("public"))

// Configurando para receber dados do request.body.
server.use(express.urlencoded({extended:true}))
server.use(express.json());

// Config da template engine.
server.set("view engine", "njk")
nunjucks.configure("src/app/views", {
    express:server,
    autoescape:false,
    noCache:true,
})

// Rotas do app web

server.get ("/", (req, res) => {
  return res.render("index")
})
server.get("/divulgacao", (req, res) => {
  return res.render("divulgacao")
})
server.post("/divulgacao", (req, res) => {
  const keys = Object.keys(req.body)

  for(key of keys){
    if(req.body[key] == ""){
      return res.send("Por favor, digite a pessoa a ser divulgada.")
    }
  }

  const { nick } = req.body

  client.say("#jpbrab0",`!sh-so ${nick}`)
  return res.redirect("/")
})
server.listen(3333, () => {
  return console.log("o server está on!")
})

// Comandos da twitch

let lurk = 0
function runCommands(alvo, contexto, mensagem, bot) {
  if (bot) {
    return;
  }
  // so
  if (String(mensagem).includes("!so")) {
    var pessoaDivulgada = String(mensagem).split(" ")[1];
    client.say(alvo, `!sh-so ${pessoaDivulgada}`);
  } /* Comando de ban */else if (String(mensagem).includes("!ban")) {
    let msgRandom = Math.floor(Math.random() * 5) + 1;
    let alvoBan = String(mensagem).split(" ");
    if (alvoBan[1] == undefined) {
      client.say(
        alvo,
        `Para usar corretamente este comando digite !ban e ao lado o nick da pessoa que vc quer banir! SeemsGood`
      );
    } else {
      switch (msgRandom) {
        case 1:
          client.say(
            alvo,
            `${alvoBan[1]} foi banido por falar que php é ruim Kappa`
          );
          break;
        case 2:
          client.say(
            alvo,
            `${alvoBan[1]} foi banido por não ter feito bootcamp de 2dias de js >( `
          );
          break;
        case 3:
          client.say(alvo, `${alvoBan[1]} foi banido por usar windows LUL`);
          break;
        case 4:
          client.say(alvo, `${alvoBan[1]} foi banido por usar js Kappa`);
          break;
        case 5:
          client.say(
            alvo,
            `${alvoBan[1]} foi banido por não deixar no lurk...`
          );
          break;
        default:
          client.say(
            alvo,
            `${alvoBan[1]} foi banido por falar que java é bom Kappa`
          );
      }
    }
  }else if (String(mensagem).includes("!live")) {
    client.say(alvo, "As vezes eu faço live...");
  }else if(String(mensagem).toLowerCase().includes("lurk")){
    lurk++
    return client.say(alvo, `${lurk} pessoa(s) deixaram o lurk nessa live!`)
  } else if (String(mensagem).includes("!meta")) {
    client.say(
      alvo,
      "Minha meta para este mês é ter 10 subs para fazer uma live inteira usando o VIM!"
    );
  } else if (String(mensagem).includes("!discord")) {
    client.say(alvo, "> https://discord.gg/v6gX9dK <");
  } else if (mensagem == "!hoje") {
    fs.readFile("hoje.txt", "utf8", (err, data) => {
      client.say(alvo, data);
    });
  } else if (mensagem == "!comandos") {
    fs.readFile("comandos.txt", "utf8", (err, data) => {
      client.say(alvo, data);
    });
  }
  if (String(mensagem).includes("!github")) {
    var userGithub = String(mensagem).split(" ")[1];
    if (userGithub == undefined) {
      client.say(alvo, "https://github.com/jpbrab0");
    } else {
      client.say(alvo, `https://github.com/${userGithub}`);
    }
  } else if (String(mensagem).includes("!4noobs")) {
    client.say(
      alvo,
      `Agora não tem mais desculpa de que não tem dinheiro para estudar programação! Conheça a He4rt devs e o 4noobs! > https://github.com/he4rt/4noobs `
    );
  } else if (String(mensagem).includes("salve")) {
    client.say(alvo, `Olá, seja bem-vindo(a) a live! pepeDD  `);
  } 
}
client.on("connected", (endereco, porta) => {
  console.log("O bot ta on!");
});
client.on("message", runCommands);