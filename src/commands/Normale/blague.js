const { Command } = require('discord-akairo');

class BlagueCommand extends Command {
  constructor() {
    super('blague', {
      category: 'Normale',
      aliases: ['blague'],
      description: {
        content: 'Permet de faire une blague',
        usage: 'blague <catégorie>',
        exemples: ['blague <categorie (brune, beauf, dev, nsfw)> => le bot envoie une blague en fonction de la catégorie'],
      },
      args: [
          {id: 'category', type: 'string'}
      ],
    });
  }
  
  exec(message, {category}) {
    //variable
    const categoryCheck = ["global", "dev", "dark", "limit", "beauf", "blondes"];
    const hasValue = categoryCheck.some(e => e === category);
    //verification categorie
    if (hasValue == false){
      const embed = this.client.functions.embed()
        .setTitle('Erreur')
        .setDescription('Veuillez entrer une catégorie valide')
        .setFooter(message.author.username, message.author.displayAvatarURL())
       message.reply({embeds: [embed]})
       setTimeout(() => {
         message.channel.bulkDelete(2)
       }, 5000);
     }else{
       const fetch = require('cross-fetch');
       const url = category + "/random";
        fetch('https://www.blagues-api.fr/api/type/' + url, {
            headers: {
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiODc5MTQyMDMwMjIyMTkyNzEwIiwibGltaXQiOjEwMCwia2V5IjoiSm9zODJrRUlIakxHaXNJU3ZCaTFWczdqTzVpMFRCaFZkdWx4cWFOUUhGemEyblBrcDYiLCJjcmVhdGVkX2F0IjoiMjAyMS0xMC0yN1QyMDo0NTo1OSswMDowMCIsImlhdCI6MTYzNTM2NzU1OX0.ZlQW9X7oWLUkVXTFsQqKz3wo0fihQtQyNYEj34XYsG4`
                }
            })
                .then(response => response.json())
                .then(data => {
                const embed = this.client.functions.embed()
                    .setTitle('Blague')
                    .addField(`${data.joke}`, `${data.answer}`)
                    .setFooter(message.author.username, message.author.displayAvatarURL())
                message.reply({embeds: [embed]})
        })
      }
   }
}
module.exports = BlagueCommand;