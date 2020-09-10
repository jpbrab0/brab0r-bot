const tmi = require("tmi.js");
const fs = require("fs")
const settings = require("./opts.json");
// Definir opções de configuração
const opts = {
  identity: {
    username: settings.botname,
    password: settings.token,
  },
  channels: [settings.channel],
};
// Cria um cliente tmi com  nossas opções
const client = new tmi.client(opts);

client.connect();
function commands(alvo, contexto, mensagem, bot) {
  if (bot) {
    return;
  } //se for mensagens do nosso bot ele não faz nada

  // remove espaço em branco da mensagem para verificar o comando
  const commandName = mensagem;
  // checando o nosso comando
  if (String(commandName).includes("!ban")) {
    let msgRandom = Math.floor(Math.random() * 5) + 1;
    let probability = Math.floor(Math.random() * 3000) + 1;
    let alvoBan = String(commandName).split(" ");
    let user = String(alvo).split("#");
    switch(msgRandom){
      case 1:
        client.say(
          alvo,
          `${user[1]} baniu ${alvoBan[1]} por falar que php é ruim Kappa`
          )
          break
        case 2:
          client.say(
            alvo,
            `${user[1]} baniu ${alvoBan[1]} por não ter feito bootcamp de 2dias de js >( `
          )
          break
        case 3:
          client.say(
            alvo,
            `${user[1]} baniu ${alvoBan[1]} por usar windows LUL`
          )
          break
        case 4:
          client.say(
            alvo,
            `${user[1]} baniu ${alvoBan[1]} por usar js Kappa`
          )
          break
        case 5:
            client.say(
              alvo,
              `${user[1]} baniu ${alvoBan[1]} por não deixar no lurk...`
            )
            break
        default:
          client.say(
            alvo,
            `${user[1]} baniu ${alvoBan[1]} por falar que java é bom Kappa`
            )
    }
    if (probability >= 250 && probability <= 500) {
      client.say(alvo, `/timeout ${alvoBan[1]} 100`);
      client.say(alvo, `${alvoBan[1]} foi banido LUL`);
    } else if (probability >= 1500 && probability <= 2300) {
      client.say(alvo, `/timeout ${user[1]} 100`);
      client.say(alvo, `${user[1]} foi banido LUL`);
    } else {
      client.say(alvo, "ninguem foi banido! SeemsGood");
    }
  } else if(String(commandName).includes("!garen")){
      client.say(alvo, 'Garen nunca mais voltou na minha humilde live...')
  } else if (String(commandName).includes("!meta")){
      client.say(alvo,"Minha meta para este mês é ter 10 subs para fazer uma live inteira usando o VIM!")
  } else if (String(commandName).includes("!discord")){
      client.say(alvo,"> https://discord.gg/v6gX9dK <")
  } else if(commandName == '!hoje'){
      fs.readFile("hoje.txt",'utf8' ,(err, data) => {
        client.say(alvo, data)
      })
  } else if(commandName == '!comandos') {
      fs.readFile("comandos.txt", 'utf8', (err, data) => {
        client.say(alvo,data)
      })
  }
}

client.on("message", commands);