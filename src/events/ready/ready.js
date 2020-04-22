const BaseEvent = require('../../utils/structures/BaseEvent');
const StateManager = require('../../utils/StateManager');

const guildCommandPrefixes = new Map();

module.exports = class ReadyEvent extends BaseEvent {
    constructor () {
        super('ready');
        this.connection = StateManager.connection;
    }
    async run (client) {
        console.log(client.user.tag + ` авторизовалась в сети на ${client.guilds.cache.size} серверах.`);

        client.user.setStatus('online');
        client.user.setActivity("Лучший бот на свете - Эйфория!", { type: "STREAMING" });

        let activeNum = 0;

        setInterval(function() {
            if (activeNum === 0) {
                client.user.setActivity("Специально для тебя!", { type: "STREAMING" });
                activeNum = 1; 
            } else if (activeNum === 1) {
                client.user.setActivity("Разработан пользователем tElore.", { type: "STREAMING" });
                activeNum = 2;
            }  else if (activeNum === 2) {
                client.user.setActivity("Для помощи напиши !help.", { type: "STREAMING" });
                activeNum = 0;
            }
        }, 3 * 1000);        


        client.guilds.cache.forEach(guild => {
            this.connection.query(
                `SELECT cmdPrefix FROM GuildConfigurable WHERE guildId = '${guild.id}'` 
            ).then(result => {
                const guildId = guild.id;
                const prefix = result[0][0].cmdPrefix;
                guildCommandPrefixes.set(guild.id, prefix);
                StateManager.emit('prefixFetched', guildId, prefix)
            }).catch(err => console.log(err));
        });
    }
}