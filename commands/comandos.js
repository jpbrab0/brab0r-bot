exports.default = (client, target, context, msg) => {
    if (msg == "!comandos") {
        fs.readFile("comandos.txt", "utf8", (err, data) => {
          client.say(target, data);
        });
    }
}