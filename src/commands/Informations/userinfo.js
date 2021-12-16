const { Command } = require('discord-akairo');

class UserInfoCommand extends Command {
  constructor() {
    super('userinfo', {
      category: 'Information',
      aliases: ['userinfo', 'info'],
      description: {
        content: 'Envoie les informations d\'un utilisateur de votre choix, ou vous-même',
        usage: 'userinfo <utilisateur>',
        exemples: ['userinfo <ping d\'un utilisateur> => informations d\'un utilisateur tel que sa date d\'arriver.'],
      },
      args: [{ id: 'member', type: 'member', default: message => message.member }],
    });
  }
  
  
  exec(message, args) {
    //embed
    message.reply({ embeds: [
      this.client.functions.embed()
        .setTitle(`${args.member.user.tag}`)
        .setThumbnail(args.member.user.displayAvatarURL())
        .addFields([
          {
            name: 'Identifiant',
            value: `${args.member.id}`,
            inline: false
          },
          {
            name: 'Le compte a été créé le',
            value: `${args.member.user.createdAt}`,
            inline: false
          },
          {
            name: 'Le compte a rejoint le serveur le ',
            value: `${args.member.joinedAt}`,
            inline: false
          },
        ])
        .setFooter(message.author.username, message.author.displayAvatarURL())
    ] })
  }
}

module.exports = UserInfoCommand;