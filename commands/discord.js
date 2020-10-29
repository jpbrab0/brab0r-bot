exports.default = (client, target, context, msg) => {
    if (String(msg).startsWith("!discord")) {
        client.say(target, "> https://discord.gg/Sj4tQTb <");
    }
}