const { MESSAGES } = require ("../../util/constants");
const config = require ('../../util/mysql.js');
const {MessageEmbed} = require("discord.js");


module.exports.run = (client, message, args) => {

    var connection= config.connection;
    if(isNaN(args[0]) || args.length > 1){
        message.reply("On ne peut faire qu'un achat à la fois sur ce marché, et ici on achete avec **l'identifiant** des objets, pas avec leurs **noms** pour plus d'informations sur les identifiants il faut faire !lsm !");
        return;
    }
    let verif = false;
    sql = `SELECT * FROM achete WHERE id_discord = ${message.author.id}`;
    connection.query(sql,function(err, achete) {
        if(err) throw err;
        achete.forEach(row => {
            if(row.id_market == args[0]){
                message.reply ("Vous avez déjà possesion de cet objet !");
                verif = true;
            }            
        });
    
        if(verif == false){
            sql = `SELECT * FROM market WHERE id_market = ${args[0]}`;
            connection.query(sql,function(err, market) {
                if(err) throw err;
                if(market.length == 0){
                    message.reply("Cet item n'existe pas !")
                }else 
                {
                    sql = `SELECT * FROM inventaire WHERE id_discord = ${message.author.id}`;
                    connection.query(sql,function(err, inventaire) {
                        if(err) throw err;
                        if(inventaire[0].coin < market[0].prix) {
                            message.reply(`Vous n'avez pas les fonds nécessaires pour faire cet achat, il vous manque ${market[0].prix - inventaire[0].coin} coin !`);
                        }else{
                            sql = `UPDATE inventaire SET coin = coin - ${market[0].prix} WHERE id_discord = ${inventaire[0].id_discord}`;
                            connection.query(sql,function(err) {
                                if(err) throw sql;                    
                                sql = `INSERT INTO achete (id_inventaire, id_discord, id_market) VALUES ("${inventaire[0].id_inventaire}", "${inventaire[0].id_discord}", "${market[0].id_market}")`;
                                connection.query(sql,function(err) {
                                    if(err) throw err;
                                    const achat = new MessageEmbed()
                                        .setAuthor(`${message.author.username} (${message.author.id})`)
                                        .setColor("#008000")
                                        .setDescription(`Votre achat a bien était prix en compte ! Il vous reste maintenant ${inventaire[0].coin - market[0].prix} coin`)
                                        .setThumbnail(message.author.avatarURL())
                                        .setTimestamp()
                                    message.reply(achat);   
                                });
                            });
                        };
                    });
                };
            });
        }
    }); 
}

module.exports.help = MESSAGES.COMMANDS.MARKET.BUY;