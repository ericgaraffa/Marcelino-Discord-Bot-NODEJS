const { MESSAGES } = require ("../../util/constants");
const config = require ('../../util/mysql.js');
const {MessageEmbed} = require("discord.js");

module.exports.run = (client, message) => {

    var connection= config.connection
    sql = `SELECT a.id_market AS idm, item, prix FROM achete A INNER JOIN market m ON A.id_market = m.id_market  WHERE id_discord = "${message.author.id}"`;
    connection.query(sql,function(err, lignes) 
    {
        if(err) throw err;
        if(lignes.length <= 0)
        {
            message.reply("tu n'a pas encore acheter d'item(s) !");
        }else
        {
            const achat = new MessageEmbed()
                .setAuthor(`${message.author.username} (${message.author.id})`)
                .setColor("#008000")
                .setDescription("Liste de votre inventaire : ")
                lignes.forEach((row) => 
                {
                    achat.addField(`**Id** : ${row.idm} | **Item** : ${row.item} | **Valeur** : ${row.prix * 0.8}`, "----");
                });
                achat.setThumbnail(message.author.avatarURL())
                achat.setTimestamp()
            message.reply(achat);
        }
    });
}

module.exports.help = MESSAGES.COMMANDS.MARKET.LSINVENTAIRE;