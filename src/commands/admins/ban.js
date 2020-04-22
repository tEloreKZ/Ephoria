const { MessageEmbed } = require('discord.js');
const BaseCommand = require('../../utils/structures/BaseCommand');
const StateManager = require('../../utils/StateManager');

module.exports = class InfoCommand extends BaseCommand {
    constructor () {
        super('banuser', 'admins', []);
        this.connection = StateManager.connection;
    }

    async run(client, message, args) {
        if(!message.member.hasPermission('BAN_MEMBERS')) {
            message.channel.send("У тебя нет прав")
        } else {
            let memberId = message.content.substring(message.content.indexOf(' ') + 1);
            let bannedMember = await message.guild.members.ban(memberId);
            if(bannedMember) {
                message.channel.send(bannedMember.tag + " был кикнут и забанен.")

                this.connection.query (
                    `UPDATE users SET banned = "ДА", kick = "ДА" WHERE discorid = ${bannedMember.id}`, function (error, rows, results, fields) {
                    }
                )
            }
            else {
                console.log("Бана нету");
            }
        }
    }

}

