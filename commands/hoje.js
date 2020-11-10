const fs = require("fs")
exports.default = (client, target, context, msg) => {
    if (String(msg).startsWith("!hoje")) {
	const userMarked = String(msg).split("!hoje").join(" ")
	if(userMarked == ' '){
        	fs.readFile("hoje.txt", "utf8", (err, data) => {
          		client.say(target, `${context.username},${data}`);
        	});
    } else {
		fs.readFile("hoje.txt", "utf8", (err, data) => {
			client.say(target, `${userMarked}, ${data}`)
		})
    	}
    }
}
