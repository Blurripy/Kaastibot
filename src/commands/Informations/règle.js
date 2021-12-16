const { Command } = require('discord-akairo');

class RegleCommand extends Command {
  constructor() {
    super('regle', {
      category: 'Information',
      aliases: ['regle'],
      description: {
        content: 'Permet d\'afficher les regles',
        usage: 'regle',
        exemples: ['regle => affiche les regles'],
      },
    });
  }
  
  exec(message) {
      const excuseChannel = this.client.channels.cache.get('906202061916499979');
      const msg = message.content.slice(5)
      message.delete()
      const embed = this.client.functions.embed()
          .setTitle('Reglement')
          .setDescription(`1 - Veuillez respecter, que ce soit, les modérateurs, les administrateurs, Kaastiel ou n'importe quel autre membre. \n\n2 - Toute insulte (ex : tg, pd, fdp, sale merde, déformation de pseudo etc....), forme d'irrespect (la critique est toléré avec respect), discrimination (ex : sale arabe, sale noir, sale gay), menace ou désigné un membre par une de ses différences/origine (ex : le renoi) pourra être puni d'un warn au minimum, si l'insulte est grave ou, si récidive, d'un mute, kick, ban.\n\n3 - Tout selfbot ou d'autres engins nuisant (tel que les doubles compte) au serveur sera bannis et le membre l'ayant invité sera sanctionné d'un mute de 3h et si récidive d'une journée si aucun membre de l'administration ou Kaastiel ne lui ai demandé la permission de l'inviter.\n\n4 - Respecter les Terms Of Services de Discordtm ou vous risquez d'être bannis.\n\n5 - Évidemment, tout raid, spam ou pub mp sera puni d'un bannissement.\n\n6 - Veuillez utiliser les bons salons (exemple : faites vos commandes dans le salon Terminal)\n\n7 - Si un membre commet un acte méritant une sanction mais que cette acte n'est pas proscrite dans ce règlement,     l'excuse se n'était pas dans le règlement ne marchera pas a part si l'acte n'était pas grave. Vous pouvez proposer des règles dans le salon sondage!\n\nEn acceptant ce reglement (en faisant la commande ".validation"), vous acceptez être soumis par des sanctions.`)
          .setThumbnail('https://media.discordapp.net/attachments/905984734130221086/906341351451426846/kjkjk.png')
          .setFooter(message.author.username, message.author.displayAvatarURL())
      message.channel.send({ embeds:[embed]})
  }
}

module.exports = RegleCommand;