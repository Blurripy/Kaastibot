const { Command } = require('discord-akairo');

class SayCommand extends Command {
  constructor() {
    super('say', {
      category: 'Normale',
      aliases: ['say'],
      description: {
        content: 'Permet de faire dire quelque chose au bot',
        usage: 'say <message>',
        exemples: ['say <message> => le bot envoie le message'],
      },
      args: [
          {id: 'msg', type: 'string', match: 'restContent'}
      ],
    });
  }
  
  exec(message, {msg}) {
    if (!msg){
      const embed = this.client.functions.embed()
        .setTitle('Erreur')
        .setDescription('Veuillez entrer un message')
        .setFooter(message.author.username, message.author.displayAvatarURL())
       message.reply({embeds: [embed]})
       setTimeout(() => {
         message.channel.bulkDelete(2)
       }, 5000);
    }else{
      message.channel.send(msg)
      message.delete()
    }
  }
}

module.exports = SayCommand;