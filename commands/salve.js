exports.default = (client, target, context, msg) => {
    if (String(msg).startsWith("salve")) {
        client.say(target, `Olá, seja bem-vindo(a) a live! pepeDD  `);
     }
}