const { MessageEmbed } = require('discord.js');
const BaseCommand = require('../../utils/structures/BaseCommand');
const StateManager = require('../../utils/StateManager');

module.exports = class InfoCommand extends BaseCommand {
    constructor () {
        super('ping', 'misc', []);
    }



    async run(client, message, args, config, gdb, prefix, permissionLevel, db) {
        let botMsg = await message.channel.send("〽️ Пингация")
      
        botMsg.edit({ embed: {
          title: "📶 Пинг",
          description: [
            "**Сервер**: `" + (botMsg.createdAt - message.createdAt) + "ms`",
            "**API**: `" + Math.round(client.ping) + "ms`",
            "**Время работы**: `" + msToTime(client.uptime) + "`"
          ].join("\n"),
        //   color: config.color,
          footer: { text: "Запросил " + message.author.tag, icon_url: message.author.displayAvatarURL },
          timestamp: new Date()
        }}).catch(() => botMsg.edit("🆘 Произошла ошибка. У вас есть разрешение?"));
      }
}


function msToTime(ms){
    days = Math.floor(ms / 86400000); // 24*60*60*1000
    daysms = ms % 86400000; // 24*60*60*1000
    hours = Math.floor(daysms / 3600000); // 60*60*1000
    hoursms = ms % 3600000; // 60*60*1000
    minutes = Math.floor(hoursms / 60000); // 60*1000
    minutesms = ms % 60000; // 60*1000
    sec = Math.floor(minutesms / 1000);
  
    let str = "";
    if (days) str = str + days + "d";
    if (hours) str = str + hours + "h";
    if (minutes) str = str + minutes + "m";
    if (sec) str = str + sec + "s";
  
    return str;
  }
    