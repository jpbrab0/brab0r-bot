exports.default = (client, target, context, msg) => {
    if (String(msg).startsWith("!github")) {
        var userGithub = String(msg).split(" ")[1];
        if (userGithub == undefined) {
          client.say(target, "https://github.com/jpbrab0");
        } else {
          client.say(target, `https://github.com/${userGithub}`);
        }
    } 
}