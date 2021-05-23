const { MESSAGES } = require ("../../util/constants");
const config = require ('../../util/mysql.js');
const {MessageEmbed} = require("discord.js");


module.exports.run = (client, message) => {

    var connection= config.connection
    sql = "SELECT * FROM market ";
    connection.query(sql,function(err, lignes) {
        if(err) throw err;
        const market = new MessageEmbed()
                .setAuthor(`${message.author.username} (${message.author.id})`)
                .setColor("#008000")
                .setDescription("Liste du marché : ")
                lignes.forEach((row) => 
                {
                    market.addField(`**ID** : ${row.id_market} | **Nom item** : ${row.item} | **Prix** : ${row.prix} coins`, "----");
                });
                market.setThumbnail(message.author.avatarURL())
                market.setTimestamp()
            message.reply(market);
    });
}

module.exports.help = MESSAGES.COMMANDS.MARKET.LSMARKET;