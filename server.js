require("dotenv").config();
const tmi = require("tmi.js");
const Discord = require("discord.js")
const nodemailer = require("nodemailer")
const fs = require("fs");
const express = require("express");
const nunjucks = require("nunjucks");
const server = express();

// configurando bot discord.
const bot = new Discord.Client()

bot.login(process.env.DISCORD_TOKEN)

bot.on("ready", () => {
  console.log("discord bot ta on")
})
bot.on("message", (msg) => {
	if(!msg.content.startsWith("!")) return
	// return msg.channels("#📻anúncios").send("funfou")
	if(msg.channel.name == "📻anúncios" && msg.content.startsWith("!divulgar")){
		return msg.channel.send(":red_circle: LIVE ON :red_circle: \n \n O @jpbrab0  está on na twitch.tv vai la ver ele codar o famoso js de rua! \n \n :link:  https://twitch.tv/jpbrab0")
  }
  
})
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

server.use(express.static("public"));

// Configurando para receber dados do request.body.
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// Config da template engine.
server.set("view engine", "njk");
nunjucks.configure("src/app/views", {
  express: server,
  autoescape: false,
  noCache: true,
});

// Rotas do app web

server.get("/", (req, res) => {
  return res.render("index");
});
server.get("/divulgacao", (req, res) => {
  return res.render("divulgacao");
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
server.get("/github", (req, res) => {
  return res.render("github");
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
server.get("/4Noobs", (req, res) => {
  return res.render("4noobs");
});
server.post("/4Noobs", (req, res) => {
  client.say(
    "#jpbrab0",
    `Quer conteudo de desenvolvimento de qualidade e gratuito?! Conheça a He4rt devs e o 4noobs! > https://github.com/he4rt/4noobs`
  );

  return res.redirect("/");
});
server.get("/discord", (req, res) => {
  return res.render("discord");
});
server.get("/sendmail", (req,res) => {
  return res.render("sendmail")
})
server.post("/sendmail", (req,res) => {
  const keys = Object.keys(req.body)

  for(key of keys){
    if(req.body[key] == ""){
      return res.send("Por favor insira todos os dados corretamente.")
    }
  }

  const { msg } = req.body
  async function main() {
    let transport = nodemailer.createTransport({
      host:'smtp.gmail.com',
      port:587,
      secure:false,
      auth:{
        user:process.env.USER,
        pass:process.env.PASS
      },
      tls:{
        rejectUnauthorized:false
      }
    })
    await transport.sendMail({
      from: '"João Pedro 👻" <jpresnewsletter@gmail.com>', // sender address
      to: "jpresende502@gmail.com", // list of receivers
      subject: "LIVE ON", // Subject line
      html: `${msg}`, // html body
    });
  }
  main()
  return res.redirect("/")
})
server.post("/discord", (req, res) => {
  client.say(
    "#jpbrab0",
    `Entre no discord do nosso canal! \n > https://discord.gg/v6gX9dK <`
  );

  return res.redirect("/");
});
server.listen(3333, () => {
  return console.log("o server está on na porta 3333!");
});

// Comandos da twitch
function runCommands(alvo, contexto, mensagem, bot) {
  if (bot) {
    return;
  }
  // so
  if (String(mensagem).startsWith("!so")) {
    var pessoaDivulgada = String(mensagem).split(" ")[1];
    client.say(alvo, `!sh-so ${pessoaDivulgada}`);
  } else if (String(mensagem).startsWith("!ban")) {
    let randomBan = Math.floor(Math.random() * 10000) + 1;
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
            `${contexto.username} baniu ${alvoBan[1]} por falar que php é ruim Kappa`
          );
          break;
        case 2:
          client.say(
            alvo,
            `${contexto.username} baniu ${alvoBan[1]} por não ter feito bootcamp de 2dias de js >( `
          );
          break;
        case 3:
          client.say(
            alvo,
            `${contexto.username} baniu ${alvoBan[1]} por usar windows LUL`
          );
          break;
        case 4:
          client.say(
            alvo,
            `${contexto.username} baniu ${alvoBan[1]} por usar js Kappa`
          );
          break;
        case 5:
          client.say(
            alvo,
            `${contexto.username} baniu ${alvoBan[1]} por não deixar no lurk...`
          );
          break;
        default:
          client.say(
            alvo,
            `${contexto.username} baniu ${alvoBan[1]} por falar que java é bom Kappa`
          );
      }
      if (randomBan > 300 && randomBan < 2000) {
        client.say(alvo, `/timeout ${alvoBan[1]} 30`);
        client.say(alvo, `${alvoBan[1]} deu azar e foi banido...`);
      } else if (randomBan > 2500 && randomBan < 6200) {
        client.say(alvo, `/timeout ${contexto.username} 30`);
        client.say(alvo, `${contexto.username} deu azar e foi banido...`);
      } else {
        client.say(alvo, `Ninguém foi banido.`);
      }
    }
  } else if (String(mensagem).startsWith("!live")) {
    client.say(alvo, "As vezes eu faço live...");
  } else if (String(mensagem).startsWith("!meta")) {
    client.say(
      alvo,
      "Minha meta para este mês é ter 10 subs para fazer uma live inteira usando o VIM!"
    );
  } else if (String(mensagem).startsWith("!discord")) {
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
  if (String(mensagem).startsWith("!github")) {
    var userGithub = String(mensagem).split(" ")[1];
    if (userGithub == undefined) {
      client.say(alvo, "https://github.com/jpbrab0");
    } else {
      client.say(alvo, `https://github.com/${userGithub}`);
    }
  } else if (String(mensagem).startsWith("!4noobs")) {
    client.say(
      alvo,
      `Quer conteudo de desenvolvimento de qualidade e gratuito?! Conheça a He4rt devs e o 4noobs! > https://github.com/he4rt/4noobs `
    );
  } else if (String(mensagem).startsWith("salve")) {
    client.say(alvo, `Olá, seja bem-vindo(a) a live! pepeDD  `);
  }
}
client.on("connected", (endereco, porta) => {
  console.log("O bot ta on!");
});
client.on("message", runCommands);
