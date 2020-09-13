const tmi = require("tmi.js");
const fs = require("fs");
const settings = require("./opts.json");
// Definir opções de configuração
const opts = {
  identity: {
    username:'brab0bot',
    password: process.env.TOKEN,
  },
  channels: ['jpbrab0'],
};
// Cria um cliente tmi com  nossas opções
const client = new tmi.client(opts);

client.connect();
function commands(alvo, contexto, mensagem, bot) {
  if (bot) {
    return;
  }

  var contador = Number(0);
  const commandName = mensagem;
  if (String(commandName).includes("!ban")) {
    let msgRandom = Math.floor(Math.random() * 5) + 1;
    let probability = Math.floor(Math.random() * 3000) + 1;
    let alvoBan = String(commandName).split(" ");
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
        if (probability >= 250 && probability <= 500) {
          client.say(alvo, `/timeout ${alvoBan[1]} 100`);
          client.say(alvo, `${alvoBan[1]} foi banido LUL`);
        } else if (probability >= 1500 && probability <= 2300) {
          client.say(alvo, `/timeout ${user[1]} 100`);
          client.say(alvo, `${user[1]} foi banido LUL`);
        } else {
          client.say(alvo, "ninguem foi banido! SeemsGood");
        }
      }
    }
  } else if (String(commandName).includes("!garen")) {
    client.say(alvo, "Garen nunca mais voltou na minha humilde live...");
  } else if (String(commandName).includes("!meta")) {
    client.say(
      alvo,
      "Minha meta para este mês é ter 10 subs para fazer uma live inteira usando o VIM!"
    );
  } else if (String(commandName).includes("!discord")) {
    client.say(alvo, "> https://discord.gg/v6gX9dK <");
  } else if (commandName == "!hoje") {
    fs.readFile("hoje.txt", "utf8", (err, data) => {
      client.say(alvo, data);
    });
  } else if (commandName == "!comandos") {
    fs.readFile("comandos.txt", "utf8", (err, data) => {
      client.say(alvo, data);
    });
  } else if (String(commandName).includes("!github")) {
    var userGithub = String(commandName).split(" ")[1];
    if (userGithub == undefined) {
      client.say(alvo, "https://github.com/jpbrab0");
    } else {
      client.say(alvo, `https://github.com/${userGithub}`);
    }
  } else if(String(commandName).includes("!4noobs")){
      client.say(alvo,`Agora não tem mais desculpa de que não tem dinheiro para estudar programação! Conheça a He4rt devs e o 4noobs! > https://github.com/he4rt/4noobs `)
  } else if (String(commandName).includes("salve")){
      client.say(alvo, `Olá, seja bem-vindo(a) a live! pepeDD  ` )
  }
}
function entrouNoChatDaTwitch(endereco, porta) {
  console.log(`* Bot entrou no endereço ${endereco}:${porta}`);
}
client.on("connected", entrouNoChatDaTwitch);
client.on("message", commands);