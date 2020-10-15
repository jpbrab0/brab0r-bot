exports.default = (client, target, context,msg ) => {
    if (String(msg).startsWith("!live")) {
        client.say(target, "As vezes eu faço live...");
    }
}