const { embed } = require ('../util/functions');
const { AkairoClient, CommandHandler, ListenerHandler } = require('discord-akairo');

module.exports = class KaastibotClient extends AkairoClient{
  constructor(config = {}) {
    super(
      { ownerID: '879142030222192710'},
      {
        allowedMentions: {
          parse: ['roles', 'everyone','users'],
          repliesUser: false
        },
        partials: ['CHANNEL', 'GUILD_MEMBER', 'MESSAGE', 'REACTION', 'USER'],
        presence: {
          status: 'dnd',
          activities : [
            {
              name: 'Je suis un esclave avec comme préfix ".". faites ".help" pour avoir la liste de mes commandes',
              type: 'STREAMING',
              url: 'https://youtube.com/channel/UCcLkrChqiOnP6rAFAP2gGRg'
            }
          ]
        },
        intents: 32767
      }
    );
     this.commandHandler = new CommandHandler(this, {
       allowedMention: true,
       prefix: config.prefix,
       defaultCooldown: 2000,
       directory: './src/commands/'
    });
    
    this.listenerHandler = new ListenerHandler(this, {
      directory : './src/listeners'
    });
    
    this.functions = {embed: embed}
    
    this.commandHandler.loadAll();
    this.commandHandler.useListenerHandler(this.listenerHandler);
 this.listenerHandler.setEmitters({ commandHandler: this.commandHandler})
    this.listenerHandler.loadAll();
    
  }
}