const Discord = require('discord.js');
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class BanCommand extends BaseCommand {
    constructor () {
        super('8ball', 'fun', []);
    }

    async run (client, message, args) {
        let response = ["Да", "Может быть", "Нет", "Попробуй позже", "Возможно", "Абсолютно", "Скорее всего нет", "Звёзды говорят  ДА"];
        
        const newEmbed = new Discord.MessageEmbed()
        .setColor(0x32CD32)
        .addField(`Шар сказал:`, `${response[~~(Math.random() * response.length)]}, ${message.author}.`)
        
        message.channel.send(newEmbed);    
    
    } 
    
}