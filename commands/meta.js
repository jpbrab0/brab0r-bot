exports.default = (client, target, context, msg) => {
    if (String(msg).startsWith("!meta")) {
        client.say(
          target,
          "Minha meta para este mês é ter 10 subs para fazer uma live inteira usando o VIM!"
        );
    } 
}