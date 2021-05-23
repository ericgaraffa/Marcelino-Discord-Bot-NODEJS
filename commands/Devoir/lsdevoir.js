const { MESSAGES } = require ("../../util/constants");
const config = require ('../../util/mysql.js');
const {MessageEmbed} = require("discord.js");


module.exports.run = (client, message) => {

    var connection= config.connection
    sql = "SELECT * FROM devoir ";
    connection.query(sql,function(err, lignes) {
        if(err) throw err;
        const devoir = new MessageEmbed()
            .setAuthor(`${message.author.username} (${message.author.id})`)
            .setColor("#008000")
            .setDescription("Liste du marché : ")
            lignes.forEach((row) => 
            {
                devoir.addField(`**ID** : ${row.id} **Nom** : ${row.nom} **Matiere** : ${row.matiere} **Date** : ${row.jour}`, "----");
            });
            devoir.setThumbnail(message.author.avatarURL())
            devoir.setTimestamp()
        message.reply(devoir);
    });

    const embed = new MessageEmbed()
        .setAuthor(`${message.author.username} (${message.author.id})`)
        .setColor("#008000")
        .setDescription(`**Action**: Appel de l'affichage des devoirs`)
        .setThumbnail(message.author.avatarURL())
        .setTimestamp()
    client.channels.cache.get('844952924613771354').send(embed);
}

module.exports.help = MESSAGES.COMMANDS.DEVOIR.LSDEVOIR;