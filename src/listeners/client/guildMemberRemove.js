const { Listener } = require('discord-akairo');

class GuildMemberLeaveListener extends Listener {
    constructor() {
        super('guildMemberLeave', {
            emitter: 'client',
            event: 'guildMemberRemove'
        });
    }
    
    
    async exec(member) {
        const logChannel = this.client.channels.cache.get('905990934423044137');
        const embed = this.client.functions.embed()
        .setTitle(`• **${member.user.tag}** \n nous a quitté !`,)
        .setThumbnail(member.user.displayAvatarURL())
        .setFooter(`Membres: ${member.guild.memberCount.toLocaleString()}`)
       await logChannel.send({ embeds: [embed] })
    }
}

module.exports = GuildMemberLeaveListener;