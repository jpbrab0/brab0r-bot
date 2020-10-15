exports.default = (client, target, context, msg) => {
  if (String(msg).startsWith("!ban")) {
    let randomBan = Math.floor(Math.random() * 10000) + 1;
    let msgRandom = Math.floor(Math.random() * 5) + 1;
    let targetBan = String(msg).split(" ");
    if (targetBan[1] == undefined) {
      client.say(
        target,
        `Para usar corretamente este comando digite !ban e ao lado o nick da pessoa que vc quer banir! SeemsGood`
      );
    } else {
      switch (msgRandom) {
        case 1:
          client.say(
            target,
            `${context.username} baniu ${targetBan[1]} por falar que php é ruim Kappa`
          );
          break;
        case 2:
          client.say(
            target,
            `${context.username} baniu ${targetBan[1]} por não ter feito bootcamp de 2dias de js >( `
          );
          break;
        case 3:
          client.say(
            target,
            `${context.username} baniu ${targetBan[1]} por usar windows LUL`
          );
          break;
        case 4:
          client.say(
            target,
            `${context.username} baniu ${targetBan[1]} por usar js Kappa`
          );
          break;
        case 5:
          client.say(
            target,
            `${context.username} baniu ${targetBan[1]} por não deixar no lurk...`
          );
          break;
        default:
          client.say(
            target,
            `${context.username} baniu ${targetBan[1]} por falar que java é bom Kappa`
          );
      }
      if (randomBan > 300 && randomBan < 2000) {
        client.say(target, `/timeout ${targetBan[1]} 30`);
        client.say(target, `${targetBan[1]} deu azar e foi banido...`);
      } else if (randomBan > 2500 && randomBan < 6200) {
        client.say(target, `/timeout ${context.username} 30`);
        client.say(target, `${context.username} deu azar e foi banido...`);
      } else {
        client.say(target, `Ninguém foi banido.`);
      }
    }
  }
};
