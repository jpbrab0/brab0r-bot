exports.default = (client, target, context, msg) => {
    if (String(msg).startsWith("!discord")) {
        client.say(target, "> https://discord.gg/v6gX9dK <");
    }
}