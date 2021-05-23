const { MESSAGES } = require ("../../util/constants");
const config = require ('../../util/mysql.js');
const {MessageEmbed} = require("discord.js");



module.exports.run = (client, message, args) => 
{
    var connection= config.connection;
    if(args.length <= 5 || args.length >= 7 ) {
        message.reply("Il faut mettre tout les arguments nécéssaire !");
    }
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
        if(verif == true){

            let total = args[3].length;
            total += args[4].length;
            total += args[5].length;
            if(total !== 8 || isNaN(args[3]) || isNaN(args[4]) || isNaN(args[5]) || args[3].length !== 4 || args[4] > 12 || args[5] > 31)
            {
                message.reply("Tu a surement mal écrit la date ! Il faut la composer comme cela : 1998 09 22");
            }else
            {
                sql = `UPDATE devoir SET nom = "${args[1]}", matiere = "${args[2]}", jour = "${args[3]}/${args[4]}/${args[5]}" WHERE id = ${args[0]}`;
                connection.query(sql,function(err)
                {
                    if(err) throw err;
                    console.log("update réussi ! ");
                    message.reply('Ton devoir a bien était mis à jour !');
                });
            }
        }else 
        {
            message.reply("Le devoir n'existe pas");
        };  
    });

    const embed = new MessageEmbed()
        .setAuthor(`${message.author.username} (${message.author.id})`)
        .setColor("#0000FF")
        .setDescription(`**Action**: Modification d'un devoir`)
        .setThumbnail(message.author.avatarURL())
        .setTimestamp()
    client.channels.cache.get('844952924613771354').send(embed);
}

module.exports.help = MESSAGES.COMMANDS.DEVOIR.MODIFDEVOIR;