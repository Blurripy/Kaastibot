const { Command } = require('discord-akairo');
const { stripIndents } = require('common-tags');

class HelpCommand extends Command {
    constructor() {
        super('help', {
            aliases: ['help'],
            category: 'Information',
            args: [{ id: 'command', type: 'commandAlias'}]
        });
    }
    
    
    exec(message, args){
        const prefix = this.handler.prefix;
        const command = args.command;
        
        if (!command) {
            let embed = this.client.functions.embed()
            .setAuthor(
                `Help/Liste de commande`,
                this.client.user.displayAvatarURL()
            )
            
            .setDescription('Retrouver la liste de l\'entièreté des commandes ci-dessous ! Si vous avez besoin d\'aide, vous pouvez vous referez au salon aide. -Meg')
            for (const category of this.handler.categories.values()) {
                embed.addField(
                    `• ${category.id}`,
                    `${category
                        .filter(cmd => cmd.aliases.length > 0)
                        .map(cmd => `\`${cmd.aliases[0]}\``)
                        .join(', ')}`
                )
            }
            
            embed.addField(
                '**-------------**',
                `**\`${prefix}help <command>\` pour avoir une description sur une commande**
                Exemples: \`${prefix}help userinfo\``)
            .setFooter(message.author.username, message.author.displayAvatarURL())
            return message.reply({ embeds: [embed]});
        }
        
        return message.reply(stripIndents`
        \`\`\`makefile
        [Help: Command -> ${prefix}${command.aliases[0]}] ${command.ownerOnly ? '/!\\ Uniquement Blurripy peut utiliser cette commande /!\\' : ''}
        
        ${command.description.content}
        
        Utilisation ${prefix}${command.description.usage}
        Exemples: ${prefix}${command.description.exemples.join(' | ${prefix}')}
        \`\`\``);
    }
}

module.exports = HelpCommand;