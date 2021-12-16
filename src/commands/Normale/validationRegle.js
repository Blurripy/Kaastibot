const { Command } = require('discord-akairo');

class ValidationRulesCommand extends Command {
    constructor() {
        super('validation', {
            category: 'Normale',
            aliases: ['validation'],
            description: {
                content: 'Permet de valider les regles',
                usage: 'validation',
                exemples: ['validation => donne accès aux salons'],
            },
        });
    }
    async exec(message) {
        //verifie le channel
        if (message.channel.id === '905982638383300680') {
            //donne le role
            let role = message.guild.roles.cache.find(r => r.id === "905992040960110633");
            message.member.roles.add(role);
            message.delete()
        }else if (message.member.roles.cache.some(role => role.id === '905992040960110633')){
            //si le membre a déjà le role
            const embed = this.client.functions.embed()
                .setTitle('Erreur')
                .setDescription(`${message.member.user.username}, vous ne pouvez pas exécuté cette commande car vous avez déjà le role!`)                
            message.channel.send({embeds: [embed]})
            setTimeout(() => {
                message.channel.bulkDelete(1)
            }, 5000);
        }else if (message.member.roles.cache.some(role => role.id === '906057962647334922')){
            //si le membre est au goulag
            const embed = this.client.functions.embed()
                .setTitle('Erreur')
                .setDescription(`${message.member.user.username}, vous ne pouvez pas exécuté cette commande car vous êtes au goulag !`)
                            message.channel.send({embeds: [embed]})
            setTimeout(() => {
                message.channel.bulkDelete(1)
            }, 5000);
        }
        message.delete()
    }
}

module.exports = ValidationRulesCommand;