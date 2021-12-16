const { Command } = require('discord-akairo');

class BanCommand extends Command {
  constructor() {
    super('ban', {
      category: 'Moderation',
      aliases: ['ban'],
      description: {
        content: 'Permet de bannir un utilisateur',
        usage: 'ban <utilisateur> <durée maximum 7 jours> <raison non obligatoire>',
        exemples: ['ban <ping d\'un utilisateur> <nombre de jour (7 maximum)> => l\'utilisateur sera bannis'],
      },
      args: [
      { id: 'member', type: 'member'},
      { id: 'duration', type: 'number',  default: 0},
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
        .setDescription(`Il y a eu un problème lors de l'exécution de la commande, l'utilisateur n'existe pas! Pour plus d\'information sur cette erreur, veuillez faire ".help ban"`)
        .setFooter(message.author.username, message.author.displayAvatarURL())
        message.reply({embeds: [embed]});
    }
    //verifications durée du ban
    if (duration > 7) {
      message.reply({ embeds: [
      this.client.functions.embed()
        .setTitle('Erreur')
        .setThumbnail('https://media.discordapp.net/attachments/880210309762129923/910528780035031070/banhammer_D29356A.png')
        .setDescription('La durée du bannissement ne peut être supérieur à 7 ! Pour plus d\'information sur cette erreur, veuillez faire ".help ban"')
        .setFooter(message.author.username, message.author.displayAvatarURL())
      ] })
    }
    if (duration == '' || typeof duration == 'string' && reason == '') {
      message.reply({ embeds: [
      this.client.functions.embed()
        .setTitle('Erreur')
        .setThumbnail('https://media.discordapp.net/attachments/880210309762129923/910528780035031070/banhammer_D29356A.png')
        .setDescription('La durée du bannissement n\'est pas spécifiée ! Si vous voulez bannir le membre a vie, veuillez utiliser la commande permaban ! Pour plus d\'information sur cette erreur, veuillez faire ".help ban"')
        .setFooter(message.author.username, message.author.displayAvatarURL())
      ] })
    }
    //vérification global
    if (duration > 7 || member == null || duration == ''){
        return;
    }else{
        if (!reason) reason = 'Raison non spécifiée.'
        //ban
        member.ban({days: duration, reason: reason})
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

module.exports = BanCommand;