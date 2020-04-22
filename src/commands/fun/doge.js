const Discord = require('discord.js');
const superagent = require("superagent");
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class BanCommand extends BaseCommand {
    constructor () {
        super('doge', 'fun', []);
    }

    async run (client, message, args) {

        let {body} = await superagent
        .get(`https://random.dog/woof.json`);

        let dogembed = new Discord.MessageEmbed()
        .setColor("#ff9900")
        .setTitle("Собакен :dog:")
        .setImage(body.url);

        message.channel.send(dogembed);

    
    }
    
}