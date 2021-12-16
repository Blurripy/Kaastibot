const { MessageEmbed } = require("discord.js")

module.exports = {
  embed: function() {
    return new MessageEmbed()
    .setColor('#fabfff')
    .setTimestamp()
  }
}