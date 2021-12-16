const { Command } = require("discord-akairo")

class ClearCommand extends Command {
  constructor() {
    super("clear", {
      category: "Moderation",
      aliases: ["clear"],
      description: {
        content: "Permet de supprimer un nombre de message defini",
        usage: "clear <nombre de message>",
        exemples: [
          "clear <nombre de message> => supprimera un nombre de message defini",
        ],
      },
      clientPermissions: ["MANAGE_MESSAGES"],
      userPermissions: ["MANAGE_MESSAGES"],
      args: [{ id: "number", type: "number" }],
    })
  }

  exec(message, { number }) {
    if (!number) {
      message.reply({
        embeds: [
          this.client.functions
            .embed()
            .setTitle("Erreur")
            .setDescription(
              "Veuillee spécifier un nombre de message a supprimer."
            )
            .setFooter(
              message.author.username,
              message.author.displayAvatarURL()
            ),
        ],
      })
      setTimeout(() => {
        message.channel.bulkDelete(2)
      }, 5000)
      return
    }
    if (number > 100) {
          message.reply({embeds:[
              this.client.functions.embed()
                  .setTitle('Erreur')
                  .setDescription('Veuillee spécifier un nombre de message a supprimer inferieur ou égal à 100.')
                  .setFooter(message.author.username, message.author.displayAvatarURL())
          ]})
      setTimeout(() => {
        message.channel.bulkDelete(2)
      }, 5000)
      return
    }
    number = number + 1
    message.channel.bulkDelete(number)
    number = number - 1
    const embed = this.client.functions
      .embed()
      .setTitle("Clear")
      .addField("J'ai supprimé", `${number} messages !`)
      .setFooter(message.author.username, message.author.displayAvatarURL())
    message.channel.send({ embeds: [embed] })
    setTimeout(() => {
      message.channel.bulkDelete(1)
    }, 2000)
  }
}

module.exports = ClearCommand
