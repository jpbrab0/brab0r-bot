exports.default = (client, target, context, msg) => {
    if (String(msg).startsWith("!4noobs")) {
        client.say(
            target,
          `${context.username}, quer conteudo de desenvolvimento de qualidade e gratuito?! Conheça a He4rt devs e o 4noobs! > https://github.com/he4rt/4noobs `
        );
    }
}