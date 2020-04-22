const Discord = require('discord.js');
const superagent = require("superagent");
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class BanCommand extends BaseCommand {
    constructor () {
        super('cats', 'fun', []);
    }

    async run (client, message, args) {

        let {body} = await superagent
        .get(`https://aws.random.cat/meow`);
    
        let catembed = new Discord.MessageEmbed()
        .setColor("#ff9900")
        .setTitle("Кошак :cat:")
        .setImage(body.file);
    
        message.channel.send(catembed);
    
    }
    
}
