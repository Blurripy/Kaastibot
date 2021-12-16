const { Command } = require('discord-akairo');

class PardonCommand extends Command {
  constructor() {
    super('pardon', {
      category: 'Goulag',
      aliases: ['pardon'],
      description: {
        content: 'Permet de faire une excuse pour les utilisateurs au goulag',
        usage: 'pardon <excuse>',
        exemples: ['pardon <excuse> => permet de mettre une excuse dans le salon excuse'],
      },
    });
  }
  
  async exec(message) {
      const excuseChannel = this.client.channels.cache.get('906202061916499979');
      //variables
      const excuse = message.content.slice(8)
      //verification si l'excuse est vide
      if (excuse === '') {
          message.channel.send({embeds: [
              this.client.functions.embed()
                  .setTitle('Erreur')
                  .setDescription('Vous n\'avez pas mis d\'excuse !')
                  .setFooter(message.author.username, message.author.displayAvatarURL())
              ] })
          setTimeout(() => {
                  message.channel.bulkDelete(2)
          }, 5000);
      //verification si le membre n'est pas au goulag
      }else if (message.member.roles.cache.some(role => role.id === '905992040960110633')){
          const embed = this.client.functions.embed()
                .setTitle('Erreur')
                .setDescription(`Vous ne pouvez pas exécuté cette commande car vous n\'avez pas le role Goulag!`)
                .setFooter(message.author.username, message.author.displayAvatarURL())
            message.reply({embeds: [embed]})
            setTimeout(() => {
                message.channel.bulkDelete(2)
            }, 5000);
      }else if (message.member.roles.cache.some(role => role.id === '906057962647334922')){
          const embed = this.client.functions.embed()
              .setTitle('Excuse')
              .setDescription('Votre excuse a bien été envoyé !')
              .setFooter(message.author.username, message.author.displayAvatarURL())
      message.reply({ embeds: [embed]})
      setTimeout(() => {
          message.channel.bulkDelete(2)
      }, 5000);
      	      const vote = this.client.functions.embed()
                .setTitle('Excuse')
                .addField(`L\'excuse de **${message.member.user.username}** est `, `\n${'```'}\n${excuse}${'```'}`)
                .setThumbnail('https://media.discordapp.net/attachments/905984734130221086/906341351451426846/kjkjk.png')
                .setFooter(message.author.username, message.author.displayAvatarURL())
                .setTimestamp()
          excuseChannel.send({embeds: [vote]}).then(msg => {
              msg.react('✅')
              msg.react('❌')
          });
      }
  }
}

module.exports = PardonCommand;