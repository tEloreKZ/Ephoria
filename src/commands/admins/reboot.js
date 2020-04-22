const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class BanCommand extends BaseCommand {
    constructor () {
        super('', 'admins', []) ;
    }

    async run (client, message, args) {
        try {
            await message.reply("Бот перезагружается.");
            await Promise.all(this.client.commands.map(cmd => this.client.unloadCommand(cmd)));
            process.exit(1);
          } catch (e) {
            console.log(e);
          }
        }
}