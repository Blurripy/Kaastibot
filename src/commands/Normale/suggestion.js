const { Command } = require('discord-akairo');

class SuggestionCommand extends Command {
    constructor() {
        super('suggestion', {
            category: 'Normale',
            aliases: ['suggestion', 'vote'],
            description: {
                content: 'Permet de faire une suggestion',
                usage: 'suggestion <suggestion>',
                exemples: ['suggestion <ta suggestion> => le bot envoie la suggestion dans le salon suggestion.'],
            },
        });
    }
  
    exec(message){
        const suggestionChannel = this.client.channels.cache.get('905990732542779453');
        const suggestion = message.content.slice(12)
        if (suggestion == '') {
            message.reply({embeds: [
                this.client.functions.embed()
                    .setTitle('Erreur')
                    .setDescription('Vous n\'avez pas mis de suggestion !')
                    .setFooter(message.author.username, message.author.displayAvatarURL())
            ] })
            setTimeout(() => {
                message.channel.bulkDelete(2)
            }, 5000);
        }else{
            suggestionChannel.send({embeds: [
            this.client.functions.embed()
                .setTitle('Suggestion')
                .addField(`La suggestion de ${'```'}\n${message.member.user.username}${'```'} est `, `${'```'}\n${suggestion}${'```'}`)
                .setFooter(message.author.username, message.author.displayAvatarURL())
            ]}).then(msg => {
                msg.react('✅')
                msg.react('❌')
            });
            message.reply({embeds: [
            this.client.functions.embed()
                .setTitle('Suggestion')
                .setDescription(`La suggestion a bien été envoyé ! `)
                .setFooter(message.author.username, message.author.displayAvatarURL())
            ]})
            setTimeout(() => {
                message.channel.bulkDelete(2)
            }, 5000);
        }
    }
}

module.exports = SuggestionCommand;