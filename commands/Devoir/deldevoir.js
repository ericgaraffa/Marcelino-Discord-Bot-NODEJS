const { MESSAGES } = require ("../../util/constants");
const config = require ('../../util/mysql.js');
const {MessageEmbed} = require("discord.js");


module.exports.run = (client, message, args) => 
{
    var connection= config.connection
    if(isNaN(args[0])){
        message.reply("il faut que l'argument soit un entier")
    }else
    {
        sql = "SELECT * FROM devoir ";
        let verif = false;
        connection.query(sql,function(err, lignes) 
        {
            if(err) throw err;
            lignes.forEach((row) => 
            {
                if(args[0] == row.id)
                {
                    verif = true;
                }
            });
            if(verif == true)
            {
                sql = `DELETE FROM devoir WHERE id = ${args[0]} `;
                connection.query(sql,function(err) {
                if(err) throw err;
                message.reply("Le devoir a bien était effacer !");
                });
            }else 
            {
                message.reply("Le devoir n'existe pas");
            };                    
        });
        const embed = new MessageEmbed()
        .setAuthor(`${message.author.username} (${message.author.id})`)
        .setColor("#008000")
        .setDescription(`**Action**: Suppression d'un devoir`)
        .setThumbnail(message.author.avatarURL())
        .setTimestamp()
    client.channels.cache.get('844952924613771354').send(embed);
    }
}

module.exports.help = MESSAGES.COMMANDS.DEVOIR.DELDEVOIR;