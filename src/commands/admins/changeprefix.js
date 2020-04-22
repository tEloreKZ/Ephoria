const BaseCommand = require('../../utils/structures/BaseCommand');
const StateManager = require('../../utils/StateManager');

module.exports = class ChangePrefixCommand extends BaseCommand {
  constructor () {
    super('newpref', 'owner', []);
    this.connection = StateManager.connection;
  }

  async run (client, message, args) {
    if (message.member.id === message.guild.ownerID) {
      const [ cmdName, newPrefix ] = message.content.split(" ");
      if (newPrefix) {
        try {
          await this.connection.query(
            `UPDATE GuildConfigurable SET cmdPrefix = '${newPrefix}' WHERE guildId = '${message.guild.id}'`
          );
          message.channel.send(`Префикс был обнолвен на ${newPrefix}`);
          StateManager.emit('prefixUpdate', message.guild.id, newPrefix);
        } catch(err) {
          console.log(err);
          message.channel.send(`Не удалось обновить префикс на ${newPrefix}`);
        }
      } else {
        message.channel.send('Неверные значения аргументов');
      }
    } else {
      message.channel.send('У вас нет прав');
    }
  }
}