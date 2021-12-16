const { Command } = require('discord-akairo');

class GoulagCommand extends Command {
  constructor() {
    super('goulag', {
      category: 'Moderation',
      aliases: ['goulag'],
      description: {
        content: 'Permet de mettre au Goulag un utilisateur',
        usage: 'goulag <utilisateur> <raison>',
        exemples: ['goulag <ping d\'un utilisateur> <raison non obligatoire> => l\'utilisateur sera au Goulag'],
      },
      args: [
      { id: 'member', type: 'member'},
      { id: 'reason', type: 'string', match: 'restContent'}
      ],
      clientPermissions: ['KICK_MEMBERS', 'MANAGE_ROLES'],
      userPermissions: ['KICK_MEMBERS'],
    });
  }
  
  
  exec(message, { member, reason }) {
    if (member == null) {
        //verification membre
        message.reply({embeds: [
            this.client.functions.embed()
                .setTitle('Goulag erreur')
                .setThumbnail('https://media.discordapp.net/attachments/880210309762129923/910528780035031070/banhammer_D29356A.png')
                .addField(`Il y a eu un problème lors de l'exécution de la commande :`, `L'utilisateur n'existe pas!`)
                .setFooter(message.author.username, message.author.displayAvatarURL())
        ]})
    }else{
        //retire roles
        let role = message.guild.roles.cache.find(r => r.id === "905992040960110633");
        member.roles.remove(role);
        //rajouter des roles
        role = message.guild.roles.cache.find(r => r.id === "906057962647334922");
        member.roles.add(role);
        if (!reason) reason = 'Raison non spécifiée.'
        return message.reply({ embeds: [
            this.client.functions.embed()
                .setTitle('Goulag')
                .addField(`${'```'}\n ${member.user.username}, id: \n${member.user.id} ${'```'} a été envoyé(e) au Goulag avec comme raison :\n`, `${'```'}\n${reason}${'```'}`)
                .setThumbnail('https://media.discordapp.net/attachments/880210309762129923/910528780035031070/banhammer_D29356A.png')
                .setFooter(message.author.username, message.author.displayAvatarURL())
        ] })
    }
  }
}

module.exports = GoulagCommand;