const tmi = require("tmi.js");
const fs = require("fs");
const dotenv = require('dotenv')
// Definir opções de configuração

dotenv.config()
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

function ban(alvo, contexto, mensagem, bot){
  const commandName = mensagem
  if (String(commandName).includes("!ban")) {
    let msgRandom = Math.floor(Math.random() * 5) + 1;
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
        
      }
    }
}
}
function meta(alvo, contexto, mensagem, bot){
  const commandName = mensagem
  if (String(commandName).includes("!meta")) {
      client.say(
        alvo,
        "Minha meta para este mês é ter 10 subs para fazer uma live inteira usando o VIM!"
      );
  }
}
function discord(alvo, contexto ,mensagem, bot){
  const commandName = mensagem
  if (String(commandName).includes("!discord")) {
    client.say(alvo, "> https://discord.gg/v6gX9dK <");
  }
}
function hoje(alvo, contexto, mensagem, bot){
  const commandName = mensagem
  if (commandName == "!hoje") {
    fs.readFile("hoje.txt", "utf8", (err, data) => {
      client.say(alvo, data);
    });
  }
}
function comandos(alvo, contexto, mensagem, bot){
  const commandName = mensagem
  if (commandName == "!comandos") {
    fs.readFile("comandos.txt", "utf8", (err, data) => {
      client.say(alvo, data);
    });
  }
}
function github(alvo, contexto, mensagem, bot){
  const commandName = mensagem
  if (String(commandName).includes("!github")) {
    var userGithub = String(commandName).split(" ")[1];
    if (userGithub == undefined) {
      client.say(alvo, "https://github.com/jpbrab0");
    } else {
      client.say(alvo, `https://github.com/${userGithub}`);
    }
  }
}
function fornoobs(alvo,contexto, mensagem, bot){
  const commandName = mensagem
  if(String(commandName).includes("!4noobs")){
    client.say(alvo,`Agora não tem mais desculpa de que não tem dinheiro para estudar programação! Conheça a He4rt devs e o 4noobs! > https://github.com/he4rt/4noobs `)
  } else if (String(commandName).includes("salve")){
    client.say(alvo, `Olá, seja bem-vindo(a) a live! pepeDD  ` )
  }
}
function commands(alvo, contexto, mensagem, bot) {
  if (bot) {
    return;
  }  
  ban(alvo, contexto, mensagem, bot)
  meta(alvo ,contexto, mensagem, bot)
  discord(alvo, contexto ,mensagem, bot)
  hoje(alvo, contexto, mensagem, bot)
  comandos(alvo, contexto, mensagem, bot)
  github(alvo, contexto, mensagem, bot)
  fornoobs(alvo,contexto, mensagem, bot)
}
function entrouNoChatDaTwitch(endereco, porta) {
  console.log(`Bot entrou no endereço ${endereco}:${porta}`);
}
client.on("connected", entrouNoChatDaTwitch);
client.on("message", commands)