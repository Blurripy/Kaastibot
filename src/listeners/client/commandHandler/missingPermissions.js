const { Listener } = require('discord-akairo');

class MissingPermissionsListener extends Listener {
    constructor() {
    super('missingPermissions', {
        emitter: 'commandHandler',
        event: 'missingPermissions'
        });
    }
    
    
    async exec(message, command, type, missing) {
        if (type == 'client') {
            return await message.reply(`${'```'}\nJe n\'ai pas la permission d\'executer cette commande ! ${'```'}`)
        }else{
            return await message.reply(`${'```'}\nTu n\'as pas la permission d\'executer cette commande ! ${'```'}`)
        }
    }
}

module.exports = MissingPermissionsListener;