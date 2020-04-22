const { MessageEmbed } = require('discord.js');
const BaseCommand = require('../../utils/structures/BaseCommand');
const StateManager = require('../../utils/StateManager');



const os = require("os"), platform = os.type() + " (" + os.release() + ")", djsversion = require("../../../package.json").dependencies["discord.js"];

let guilds = 0, users = 0, shardCount = 0, memory = 0, memoryUsage = "0MB", memoryGlobal = 0, memoryUsageGlobal = "0MB", nextUpdate = Date.now();



module.exports = class InfoCommand extends BaseCommand {
    constructor () {
        super('info', 'misc', []);
        this.connection = StateManager.connection;
        
    }

    async run(client, message, args, config, gdb, prefix, permissionLevel, db) {


      if (nextUpdate < Date.now()) {
        nextUpdate = Date.now() + 300000
        if (client.shard) {
          guilds = await client.shard.fetchClientValues('guilds.size').then(res => res.reduce((prev, val) => prev + val, 0))
          users = await client.shard.fetchClientValues('users.size').then(res => res.reduce((prev, val) => prev + val, 0))
          shardCount = client.shard.count
        } else {
          guilds = client.guilds.cache.size
          users = client.users.cache.size
          shardCount = 0
        }
    
        memory = process.memoryUsage().heapUsed / (1048576) // 1024*1024
        if (memory >= 1024) memoryUsage = (memory / 1024).toFixed(2) + "GB"
        else memoryUsage = memory.toFixed(2) + "MB"
    
        memoryGlobal = (os.totalmem() - os.freemem()) / (1048576) // 1024*1024
        if (memoryGlobal >= 1024) memoryUsageGlobal = (memoryGlobal / 1024).toFixed(2) + "GB"
        else memoryUsageGlobal = memoryGlobal.toFixed(2) + "MB"
      }
      
      this.connection.query (
        'SELECT * FROM `botconfigs`', function (error, rows, results, fields) {
            // console.log(rows);

            let botname = rows[0].BotName;
            let author = rows[0].BotAuthor;
            let version = rows[0].BotVersion;


            message.channel.send({
              "embed": {
                "title": "Информация бота - " + client.user.tag,
                "description": `Привет, я  ${botname}. Я милая тян-бот с кучей всяких полезностей.`,
                // "color": config.color,
                "icon_url": 'https://sun9-23.userapi.com/c851124/v851124088/132a95/kLBwxl3m3bE.jpg',
                "timestamp": Date.now(),
                "url": 'https://github.com/tEloreKZ/Ephoria',
                "footer": {
                  "icon_url": message.author.displayAvatarURL,
                  "text": "Запросил " + message.author.tag
                },
                "fields": [
                  {
                    "name": "💠 Хост",
                    "value": [
                      "**ОС**: `" + platform + "`",
                      "**Библиотека**: `discord.js" + djsversion + "`",
                      "**Использование памяти**: `" + (client.shard ? memoryUsageGlobal : memoryUsage) + "`"
                    ].join("\n"),
                    "inline": true
                  },
                  {
                    "name": "🌀 Статистика",
                    "value": [
                      "**Серверов**: `" + guilds + "`",
                      "**Пользователей**: `" + users + "`",
                      // "**Shard Count**: `" + shardCount + "`"
                    ].join("\n"),
                    "inline": true
                  },
                  {
                    "name": "🌐 Информация",
                    "value": [
                      `**Автор**: <@293017471223595010>`,
                      "**Версия**: `" + version + "`"
                    ].join("\n"),
                    "inline": false
                  },
                  {
                    "name": "🌐 Ссылки",
                    "value": [
                      "**Документация:** https://github.com/tEloreKZ/Ephoria",
                      "**Пригласи меня:** [https://discordapp.com/api/oauth2/authorize?...](https://discordapp.com/api/oauth2/authorize?client_id=" + client.user.id + "&permissions=805432400&scope=bot)",
                      "**Время работы**: `" + msToTime(client.uptime) + "`",
                      "**Исходники**: https://github.com/tEloreKZ/Ephoria"
                    ].join("\n"),
                    "inline": false
                  },
                ].filter(f => f.name) // базовя фильтрация shared поля
              }
            }).catch(() => message.channel.send("🆘 Произошла ошибка. У вас есть разрешение?"));



        });


      
    
      
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