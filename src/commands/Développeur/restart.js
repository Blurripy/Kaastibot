const { Command } = require('discord-akairo');

class RestartCommand extends Command {
  constructor() {
    super('restart', {
      aliases: ['restart'],
      category: 'Developpeur',
      ownerOnly: true,
      description: {
        content: 'Redemarre le bot',
        usage: 'restart',
        exemples: ['restart => le bot redémarre']
      }
    });
  }

  exec(message) {
    require('child_process').execSync('pm2 restart 0')
  }
}

module.exports = RestartCommand;