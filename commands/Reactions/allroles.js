const { MessageEmbed } = require ("discord.js");
const { MESSAGES } = require ("../../util/constants");

module.exports.run = (client, message, args) => {
    const membreRole = message.guild.roles.cache.get("844944908828803082");
    const ModerateurRole = message.guild.roles.cache.get("844699623065911296");

    const embed = new MessageEmbed()
        .setTitle("Rôles")
        .setDescription("Cliquez sur une des réactions ci-dessous pour obtenir le rôle correspondant")
        .setColor("#dc143c")
        .addField(
            "Les rôles disponibles :",
            `
            :one: - ${membreRole.toString()}
            :two: - ${ModerateurRole.toString()}
            `
        );
        client.channels.cache.get('844953007841869854').send(embed).then(async msg =>{
            await msg.react('1️⃣');
            await msg.react('2️⃣');
        })
}

module.exports.help = MESSAGES.COMMANDS.REACTIONS.ALLROLES;
