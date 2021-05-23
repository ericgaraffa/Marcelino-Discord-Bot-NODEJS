const { MESSAGES } = require ("../../util/constants");
const config = require ('../../util/mysql.js');
const {MessageEmbed} = require("discord.js");

module.exports.run = (client, message) => {

    var connection= config.connection;
    sql = `UPDATE inventaire SET coin = coin + 10 WHERE id_discord = ${message.author.id}`;
    connection.query(sql,function(err) {
        if(err) throw err;
        sql = `SELECT * FROM inventaire WHERE id_discord = ${message.author.id}`;
        connection.query(sql,function(err, ligne) {
            if(err) throw err;
            const pointer = new MessageEmbed()
                .setAuthor(`${message.author.username} (${message.author.id})`)
                .setColor("#008000")
                .setDescription(`Bien joué tu as maitenant ${ligne[0].coin} coins ! tu pourra repointer dans 6 minutes !`)
                .setThumbnail(message.author.avatarURL())
                .setTimestamp()
            message.reply(pointer);            
        });
    });
}

module.exports.help = MESSAGES.COMMANDS.MARKET.POINTER;