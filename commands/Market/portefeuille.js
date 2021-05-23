const { MESSAGES } = require ("../../util/constants");
const config = require ('../../util/mysql.js');
const {MessageEmbed} = require("discord.js");


module.exports.run = (client, message) => {

    var connection= config.connection
    sql = `SELECT * FROM inventaire WHERE id_discord = ${message.author.id}`;
    connection.query(sql,function(err, ligne) {
        if(err) throw err;        
        const portefeuille = new MessageEmbed()
                .setAuthor(`${message.author.username} (${message.author.id})`)
                .setColor("#008000")
                .setDescription(`**Tu as ${ligne[0].coin} coin(s) dans ton inventaire !**`)
                .setThumbnail(message.author.avatarURL())
                .setTimestamp()
        message.reply(portefeuille);
    });
}

module.exports.help = MESSAGES.COMMANDS.MARKET.PORTEFEUILLE;