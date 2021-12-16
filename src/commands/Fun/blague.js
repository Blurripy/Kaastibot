const { Command } = require('discord-akairo');

class BlagueCommand extends Command {
  constructor() {
    super('blague', {
      category: 'Fun',
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
  
  async exec(message, {category}) {
    //variable
    const categories = ["global", "dev", "dark", "limit", "beauf", "blondes"];
    //verification categorie
    if (!category || !categories.includes(category.toLowerCase())){
      const embed = this.client.functions.embed()
        .setTitle('Erreur')
        .setDescription('Veuillez entrer une catégorie valide')
        .setFooter(message.author.username, message.author.displayAvatarURL())
       message.reply({embeds: [embed]})
       setTimeout(() => {
         message.channel.bulkDelete(2)
       }, 5000);
     }else{
       //dotenv
       const path = require('path')
       require('dotenv').config({ path: path.resolve(__dirname, './util/.env') })
       //blagues api import
       category = category.toLowerCase();
       const BlaguesAPI = require('blagues-api');
       const blagues = new BlaguesAPI(process.env.BLAGUE_TOKEN);
       const blague = await blagues.randomCategorized(category);
       const embed = this.client.functions.embed()
           .setTitle('Blague')
           .addFields(
               {name: 'Type', value: `${category}`},
               {name: `${blague.joke}`, value: `${blague.answer}`}
           )
           .setFooter(message.author.username, message.author.displayAvatarURL())
        message.reply({embeds: [embed]})
      }
   }
}
module.exports = BlagueCommand;