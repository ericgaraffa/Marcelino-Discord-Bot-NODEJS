const { MESSAGES } = require ("../../util/constants");
const config = require ('../../util/mysql.js');
const {MessageEmbed} = require("discord.js");


module.exports.run = (client, message, args) => {

    var connection= config.connection
    if(args.length <= 4 || args.length >= 6 ) {
        message.reply("Il faut mettre tout les arguments nécéssaire !");
        return;
    } else {
        //Vérifie si la date fait bien 8 de longeur + si il y a bien que des integer 
        //+ si la taille de l'année est bien = 4 + le mois pas supérieur a 12 + jour pas supérieur a 31
        let total = args[2].length;
        total += args[3].length;
        total += args[4].length;
        if(total !== 8 || isNaN(args[2]) || isNaN(args[3]) || isNaN(args[4]) || args[2].length !== 4 || args[3] > 12 || args[4] > 31){
            message.reply("Tu a surement mal écrit la date ! Il faut la composer comme cela : 1998 09 22");
        }else{
        sql = `INSERT INTO devoir (nom, matiere, jour) VALUES ("${args[0]}", "${args[1]}", "${args[2]}/${args[3]}/${args[4]}")`;
        connection.query(sql,function(err){
                if(err) throw err;
                console.log("ajout réussi ! ");
                message.reply('Ton devoir a bien était ajouter !');
            });
        }
        const embed = new MessageEmbed()
        .setAuthor(`${message.author.username} (${message.author.id})`)
        .setColor("#008000")
        .setDescription(`**Action**: Ajout d'un devoir`)
        .setThumbnail(message.author.avatarURL())
        .setTimestamp()
    client.channels.cache.get('844952924613771354').send(embed);        
    }
}

module.exports.help = MESSAGES.COMMANDS.DEVOIR.ADDDEVOIR;