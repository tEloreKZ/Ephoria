const Discord = require("discord.js");
const fs = require("fs");
let config = require("../../botconfig.json");

module.exports.noPerms = (message, perm) => {
    let embed = new Discord.MessageEmbed()
        .setAuthor(message.author.username)
        .setTitle("Недостаточно прав")
        .setColor(config.red)
        .addField("Нужно больше прав", perm);

    message.channel.send(embed).then(m => m.delete(5000));
}

module.exports.equalPerms = (message, user, perms) => {

    let embed = new Discord.MessageEmbed()
        .setAuthor(message.author.username)
        .setColor(config.red)
        .setTitle("Error")
        .addField(`${user} has perms`, perms);

    message.channel.send(embed).then(m => m.delete(5000));

}

module.exports.botuser = (message) => {
    let embed = new Discord.MessageEmbed()
        .setTitle("Error")
        .setDescription("You cannot ban a bot.")
        .setColor(config.red);

    message.channel.send(embed).then(m => m.delete(5000));
}

module.exports.cantfindUser = (channel) => {
    let embed = new Discord.MessageEmbed()
        .setTitle("Ошибка")
        .setDescription("Данный пользователь не найден.")
        .setColor(config.red);

    channel.send(embed).then(m => m.delete(5000));
}

module.exports.noReason = (channel) => {
    let embed = new Discord.MessageEmbed()
        .setTitle("Ошибка")
        .setDescription("Пожалуйста укажите причину.")
        .setColor(config.red);

    channel.send(embed).then(m => m.delete(5000));
}