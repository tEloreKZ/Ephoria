require('dotenv').config();
const { Client } = require('discord.js');
const client = new Client();
let connections;

const guildCommandPrefixes = new Map();

client.on('ready', () => {
    console.log(`${client.user.tag} авторизовалась.`);
    client.guilds.cache.forEach(guild => {
        connections.query(
            `SELECT cmdPrefix FROM GuildConfigurable WHERE guildId = '${guild.id}'`
        ).then(result => {
            guildCommandPrefixes.set(guild.id, result[0][0].cmdPrefix);
        }).catch(err => console.log(err));
    });
});

client.on('guildCreate', async (guild) => {
    try {
        await connections.query(
            `INSERT INTO Guilds VALUES('${guild.id}', '${guild.ownerID}')`
        );
        await connections.query(
            `INSERT INTO GuildConfigurable (guildId) VALUES ('${guild.id}')`
        );
    } catch(err) {
        console.log(err);
    }
});

client.on('message', async (message) => {
    if (message.author.bot) return;
    const prefix = guildCommandPrefixes.get(message.guild.id);
    if (message.content.toLowerCase().startsWith(prefix + 'help')) {
        message.channel.send(`Тестовая команда из БД: ${prefix}`);
    }
});

(async () => {
    connections = await require('../database/dbconnect');
    await client.login(process.env.BOT_TOKEN);
})();
