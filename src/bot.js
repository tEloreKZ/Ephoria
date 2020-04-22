require('dotenv').config();
const { Client } = require('discord.js');
const client = new Client();
const StateManager = require('../src/utils/StateManager');

const { registerCommands, registerEvents } = require('./utils/register');


var Discord = require('discord.js');
var bot = new Discord.Client();

const newUsers = [];



client.on("guildMemberAdd", (member) => {
    this.connection = StateManager.connection;
    const guild = member.guild;
    if (!newUsers[guild.id]) newUsers[guild.id] = new Discord.Collection();
    newUsers[guild.id].set(member.id, member.user);
    this.connection.query ( 
      `INSERT INTO users (name, discorid, banned, kick) VALUES ('${member.user.tag}', '${member.user.id}', 'НЕТ', 'НЕТ')`, function (error, rows, results, fields) {
      }
    ); 
    member.send(
        `
        Приветсвую в нашем Дискорде!
        `
    );
    newUsers[guild.id].clear();
  });

client.on("guildMemberRemove", async member => {
    this.connection = StateManager.connection;
    this.connection.query (
        `DELETE FROM users WHERE discorid = '${member.user.id}'`, function (error, rows, results, fields) {
        }
    );
});




(async () => {
    await client.login(process.env.BOT_TOKEN);
    client.commands = new Map();
    await registerCommands(client, '../commands');
    await registerEvents(client, '../events');
})();






