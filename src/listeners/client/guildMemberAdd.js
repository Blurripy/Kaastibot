const { Listener } = require('discord-akairo');

class GuildMemberAddListener extends Listener {
    constructor() {
        super('guildMemberAdd', {
            emitter: 'client',
            event: 'guildMemberAdd'
        });
    }
    
    
    async exec(member) {
        const logChannel = this.client.channels.cache.get('905990934423044137');
        const embed = this.client.functions.embed()
        .setTitle(`• **${member.user.tag}** \n nous a rejoint !`,)
        .setThumbnail(member.user.displayAvatarURL())
        .setFooter(`Membres: ${member.guild.memberCount.toLocaleString()}`)
       await logChannel.send({ embeds: [embed] })
    }
}

module.exports = GuildMemberAddListener;