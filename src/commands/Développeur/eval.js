const { Command } = require('discord-akairo');

const clean = text => {
  if (typeof (text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
    return text;
}

module.exports = class EvalCommand extends Command {
  constructor() {
    super('eval', {
      aliases: ['eval'],
      category: 'Developpeur',
      ownerOnly: true,
      args: [
        {
          id: 'code',
          match: 'content',
        },
      ],
      description: {
        category: 'Developpeur',
        content: 'Permet d\'executer des commande JavaScript dans le bot (uniquement faisable par Blurripy)',
        usage: 'eval',
        exemples: ['eval message.channel.send(\'bonsoir\') => le bot enverra bonsoir'],
      }
    });
  }

  async exec(message, { code }) {
    try {
      let evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

      message.channel.send(clean(evaled), { code: "xl" });
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  }
};