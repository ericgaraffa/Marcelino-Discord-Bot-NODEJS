const { MESSAGES } = require ("../../util/constants");
const config = require ('../../util/mysql.js');
const {MessageEmbed} = require("discord.js");


module.exports.run = (client, message, args) => {

    var connection= config.connection
    //Verifie si c'est un entier, et qu'il y ai bien qu'un seul argument
    if(isNaN(args[0]) || args.length > 1){
        message.reply("On ne peut vendre qu'un item à la fois sur ce marché, et ici on achete avec **l'identifiant** des objets, pas avec leurs **noms** pour plus d'informations sur les identifiants il faut faire !lsi !");
        return;
    }
    let verif = false;
    //Vérifie si il détient bien l'item demander
    sql = `SELECT * FROM achete WHERE id_discord = ${message.author.id}`;
    connection.query(sql,function(err, achete) {
        if(err) throw err;
        achete.forEach(row => {
            if(row.id_market == args[0]){
                verif = true;
            }            
        });
        if(verif == true)
        {
            sql = `SELECT * FROM market WHERE id_market = ${args[0]}`;
            connection.query(sql,function(err, market) {
                if(err) throw err;
                sql = `SELECT * FROM inventaire WHERE id_discord = ${message.author.id}`;
                connection.query(sql,function(err, inventaire) {
                    if(err) throw err;
                    //Ajout des coins dans le portefeuille
                    sql = `UPDATE inventaire SET coin = coin + ${market[0].prix * 0.8}`;
                    connection.query(sql,function(err) {
                        if(err) throw err;
                        //Suppression de l'item de l'inventaire du client
                        sql = `DELETE FROM achete WHERE id_discord = ${message.author.id} AND id_market = ${args[0]}`;
                        connection.query(sql,function(err) {
                            if(err) throw err;
                            const vente = new MessageEmbed()
                            .setAuthor(`${message.author.username} (${message.author.id})`)
                            .setDescription(`Votre item a bien était vendu au marché ! Vous avez gagner ${market[0].prix * 0.8} coins ! Vous avez maitenant ${inventaire[0].coin + (market[0].prix * 0.8)} coins !`)
                            .setThumbnail(message.author.avatarURL())
                            .setTimestamp()
                            message.reply(vente);
                        });
                    });
                });
            });
            
            const embed = new MessageEmbed()
                .setAuthor(`${message.author.username} (${message.author.id})`)
                .setColor("#008000")
                .setDescription(`**Action**: Vente d'un objet`)
                .setThumbnail(message.author.avatarURL())
                .setTimestamp()
            client.channels.cache.get('844952924613771354').send(embed);
         }else message.reply("Tu ne détient pas cet objet !");
    });

}

module.exports.help = MESSAGES.COMMANDS.MARKET.VENTE;