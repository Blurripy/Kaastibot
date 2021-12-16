const { Command } = require('discord-akairo');

class KickCommand extends Command {
  constructor() {
    super('kick', {
      category: 'Moderation',
      aliases: ['kick'],
      description: {
        content: 'Permet d\'expulser un utilisateur',
        usage: 'kick <utilisateur>',
        exemples: ['kick <ping d\'un utilisateur> <raison non obligatoire> => l\'utilisateur sera expulsé'],
      },
      args: [
      { id: 'member', type: 'member'},
      { id: 'reason', type: 'string', match: 'restContent', default: 'Raison non spécifiée'},
      ],
      clientPermissions: ['KICK_MEMBERS'],
      userPermissions: ['KICK_MEMBERS'],
    });
  }
  
  
  exec(message, { member, reason }) {
    if (!member) {
      const embed = this.client.functions.embed()
          .setTitle("Kick erreur")
          .setThumbnail('https://media.discordapp.net/attachments/880210309762129923/910528780035031070/banhammer_D29356A.png')
          .addField(`Il y a eu un problème lors de l'exécution de la commande :`, `L'utilisateur n'existe pas!`)
          .setFooter(message.author.username, message.author.displayAvatarURL())
    }else{
      if (!reason) reason = 'Aucune raison spécifié !'
      member.kick(reason)
      return message.reply({ embeds: [
      this.client.functions.embed()
        .setTitle('Kick')
        .addField(`${'```'}\n ${member.user.username}, id: \n${member.user.id} ${'```'} a été expulsé(e) avec comme raison :\n`, `${'```'}\n${reason}${'```'}`)
        .setThumbnail('https://media.discordapp.net/attachments/880210309762129923/910528780035031070/banhammer_D29356A.png')
        .setFooter(message.author.username, message.author.displayAvatarURL())
      ] })
    }
  }
}

module.exports = KickCommand;