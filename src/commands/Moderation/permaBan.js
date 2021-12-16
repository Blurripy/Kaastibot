const { Command } = require('discord-akairo');

class PermaBanCommand extends Command {
  constructor() {
    super('permaban', {
      category: 'Moderation',
      aliases: ['permaban'],
      description: {
        content: 'Permet de bannir un utilisateur à vie',
        usage: 'permaban <utilisateur>',
        exemples: ['permaban <ping d\'un utilisateur> l\'utilisateur sera bannis'],
      },
      args: [
      { id: 'member', type: 'member'},
      { id: 'reason', type: 'string', match: 'restContent'},
      ],
      clientPermissions: ['BAN_MEMBERS'],
      userPermissions: ['BAN_MEMBERS'],
    });
  }
  
  
  exec(message, { member, duration, reason }) {
      //verification membre
      if (member == null) {
      const embed = this.client.functions.embed()
        .setTitle("Ban erreur")
        .setThumbnail('https://media.discordapp.net/attachments/880210309762129923/910528780035031070/banhammer_D29356A.png')
        .addField(`Il y a eu un problème lors de l'exécution de la commande `, `l'utilisateur n'existe pas! Pour plus d\'information sur cette erreur, veuillez faire ".help permaban"`)
        .setFooter(message.author.username, message.author.displayAvatarURL())
        message.reply({embeds: [embed]});
    }else{
        if (!reason) reason = 'Raison non spécifiée.'
        //ban
        member.ban({reason: reason})
        //embed
        return message.reply({ embeds: [
          this.client.functions.embed()
            .setTitle('Ban')
            .addField(`${'```'}\n ${member.user.username}, id: \n${member.user.id} ${'```'} a été banni(e) avec comme raison :\n`, `${'```'}\n${reason}${'```'}`)
            .setThumbnail('https://media.discordapp.net/attachments/880210309762129923/910528780035031070/banhammer_D29356A.png')
            .setFooter(message.author.username, message.author.displayAvatarURL())
        ] })
    }
  }
}

module.exports = PermaBanCommand;