exports.default = (client, target, context, msg) => {
    if (msg == "!hoje") {
        fs.readFile("hoje.txt", "utf8", (err, data) => {
          client.say(target, data);
        });
    }
}