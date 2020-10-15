exports.default = (client, target, context, msg) => {
    if (String(msg).startsWith("!so")) {
        var pessoaDivulgada = String(msg).split(" ")[1];
        client.say(target, `!sh-so ${pessoaDivulgada}`);
    }
}