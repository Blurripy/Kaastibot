const { Command } = require('discord-akairo');

class PingCommand extends Command {
    constructor() {
        super('ping', {
            category: 'Information',
            aliases: ['ping'],
            description: {
              content: 'Envoie la latence du bot ',
              usage: 'ping',
              exemples: ['ping']
            }
        });
      }
  
  
    async exec(message) {
        //message 1
        const sentMessage = await message.reply('Pong !');
        //message 2
        const timeStamp = message.editedTimestamp ? message.editedTimestamp : message.createdTimestamp;
        //variable et calculs
        const botLatency = `${'```'}\n ${Math.round(sentMessage.createdTimestamp - timeStamp)}ms ${'```'}`;
        const apiLatency = `${'```'}\n ${Math.round(message.client.ws.ping)}ms ${'```'}`;
        //embed final
        const embed = this.client.functions.embed()
            .setTitle('Pong ! 🏓')
            .addField('Latence du bot', botLatency, true)
            .addField('Latence de l\'API', apiLatency, true)
            .setFooter(message.author.username, message.author.displayAvatarURL())
            .setTimestamp();
            
            await sentMessage.edit({
                content: null,
                embeds: [embed]
            })
    }
}

module.exports = PingCommand;