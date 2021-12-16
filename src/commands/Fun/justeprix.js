const { Command } = require('discord-akairo');

class JustePrixCommand extends Command {
  constructor() {
    super('justeprix', {
      category: 'Normale',
      aliases: ['justeprix'],
      description: {
        content: 'Permet de faire dire quelque chose au bot',
        usage: 'justeprix <prix>',
        exemples: ['justeprix <prix> => le bot jouera au justeprix'],
      },
      args: [
          {id: 'prix', type: 'number'}
      ],
    });
  }
  
  exec(message, {prix}) {
    if (!prix || prix > 200){
      const embed = this.client.functions.embed()
        .setTitle('Erreur')
        .setDescription(`Veuillez entrer un prix ${prix > 200} : ' entre 1 et 200'}`)
        .setFooter(message.author.username, message.author.displayAvatarURL())
       message.reply({embeds: [embed]})
       setTimeout(() => {
         message.channel.bulkDelete(2)
       }, 5000);
    }else{
      const justeprix = Math.floor(Math.random() * 200)
      while(prix != justeprix){
          if(prix > justeprix){
              return message.reply('test +')
          }else{
              return message.reply('test -')
          }
          message.channel.send('test')
      }
    }
  }
}

module.exports = JustePrixCommand;