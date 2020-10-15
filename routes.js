const express = require("express");
const routes = express.Router();
const Discord = require("discord.js")
const nodemailer = require("nodemailer");

const webhookClient = new Discord.WebhookClient('766120636627550208', '7C3n1sofSYyHKxQuTz4dZYHrRAN1Q6eqLx5LnPN-6vAjoMWmkbZL4sRrrw63Z4lW32mC');
routes.get("/", (req, res) => {
  return res.render("index");
});
routes.get("/divulgacao", (req, res) => {
  return res.render("divulgacao");
});
routes.post("/divulgacao", (req, res) => {
  const keys = Object.keys(req.body);

  for (key of keys) {
    if (req.body[key] == "") {
      return res.send("Por favor, digite a pessoa a ser divulgada.");
    }
  }

  const { nick } = req.body;

  client.say("#jpbrab0", `!sh-so ${nick}`);
  return res.redirect("/");
});
routes.get("/github", (req, res) => {
  return res.render("github");
});
routes.post("/github", (req, res) => {
  const keys = Object.keys(req.body);

  for (key of keys) {
    if (req.body[key] == "") {
      return client.say("#jpbrab0", "https://github.com/jpbrab0");
    }
  }
  const { github } = req.body;

  client.say("#jpbrab0", `https://github.com/${github}`);

  return res.redirect("/");
});
routes.get("/4Noobs", (req, res) => {
  return res.render("4noobs");
});
routes.post("/4Noobs", (req, res) => {
  client.say(
    "#jpbrab0",
    `Quer conteudo de desenvolvimento de qualidade e gratuito?! Conheça a He4rt devs e o 4noobs! > https://github.com/he4rt/4noobs`
  );

  return res.redirect("/");
});
routes.get("/discord", (req, res) => {
  return res.render("discord");
});
routes.get("/sendmail", (req, res) => {
  return res.render("sendmail");
});
routes.post("/sendmail", (req, res) => {
  const keys = Object.keys(req.body);

  for (key of keys) {
    if (req.body[key] == "") {
      return res.send("Por favor insira todos os dados corretamente.");
    }
  }

  const { msg } = req.body;
  async function main() {
    let transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    await transport.sendMail({
      from: '"João Pedro 👻" <jpresnewsletter@gmail.com>', // sender address
      to: "jpresende502@gmail.com", // list of receivers
      subject: "LIVE ON", // Subject line
      html: `${msg}`, // html body
    });
  }
  main();
  return res.redirect("/");
});
routes.post("/discord", (req, res) => {
  client.say(
    "#jpbrab0",
    `Entre no discord do nosso canal! \n > https://discord.gg/v6gX9dK <`
  );

  return res.redirect("/");
});
routes.get("/divulgadiscord", (req, res) => {
  return res.render("divulgacaoDiscord");
});
routes.post("/divulgadiscord", (req, res) => {
  let message =
    "@everyone \n :red_circle: LIVE ON :red_circle: \n \n O @jpbrab0  está on na twitch.tv vai la ver ele codar o famoso js de rua! \n \n :link:  https://twitch.tv/jpbrab0";
  webhookClient.send(message, {
    username: "Divulgador das lives do jpbrab0",
    avatarURL: "https://blog.twitch.tv/assets/uploads/01-twitch-logo.jpg",
  });
  return res.redirect("/");
});

module.exports = routes;
