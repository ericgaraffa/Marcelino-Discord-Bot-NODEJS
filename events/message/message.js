const Discord = require('discord.js');
const { prefix } = require ('../../config.js');
const config = require ('../../util/mysql.js');

module.exports = (client, message) => {
    var connection= config.connection;
    var verif = false;
    //Quand l'utilisateur écrit pour la première fois une requete, il est inscrit dans la base de données comme utilisateur du serveur
    let sql = "SELECT id_discord FROM utilisateur ";
    connection.query(sql,function(err, lignes) {
        if(err) throw err;
        lignes.forEach((row) => {
            //si l'id de l'auteur est égale a une id ce trouvant dans la bd
            if(message.author.id == row.id_discord){
                verif = true;
            }
        });
    if(verif == false){
        // Crée l'utilisateur dans la bd
        sql = `INSERT INTO utilisateur (id_discord) VALUES (${message.author.id})`;
        connection.query(sql,function(err) {
            if(err) throw err;
            console.log("utilisateur bien ajouter a la base de données.");
            });
        //Crée l'inventaire de l'utilisateur
        sql = `INSERT INTO inventaire (coin, id_discord) VALUES (0, ${message.author.id})`
        connection.query(sql,function(err) {
            if(err) throw err;
            console.log("L'inventaire de l'utilisateur a bien était crée");
            });
        
        }
    });
    //si le type de message et un dm, on renvoie vers l'events directMessage
    if(message.channel.type === "dm") return client.emit("directMessage", message);
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    //enleve le préfix + met les arguments dans un tableau
    const args = message.content.slice(prefix.length).split(/ +/);
    //console.log(args.slice(2).join(' '));
    const commandName = args.shift().toLowerCase();
    const user = message.mentions.users.first();
    
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(commandName));
    //console.log(command);

    if(!command) return;

    if(command.help.permissions && !message.member.hasPermission('BAN_MEMBERS')) return message.reply("tu n'as pas les permissions pour taper cette commande !");

    if(command.help.args && !args.length) {
        let noArgsReply = `Il nous faut des arguments pour cette commande, ${message.author} ! `;
        if (command.help.usage) noArgsReply += `\n Voici comment utiliser la commande : \`${prefix}${command.help.name} ${command.help.usage}\``;
        
        return message.channel.send(noArgsReply);
    };

    if(command.help.isUserAdmin && !user) return message.reply('il faut mentionner un utilisateur');
    
    if(command.help.isUserAdmin && message.guild.member(user).hasPermission('BAN_MEMBERS')) return message.reply(`Tu ne peux pas utiliser cette commande sur cet utilisateur. ${command.help.name}`);        

    if(!client.cooldowns.has(command.help.name)) {
        client.cooldowns.set(command.help.name, new Discord.Collection());
    };

    const timeNow = Date.now();
    const tStamps = client.cooldowns.get(command.help.name);
    //conversion en ms
    const cdAmount = (command.help.cooldown || 5) * 1000;

    if(tStamps.has(message.author.id)){
        const cdExpirationTime = tStamps.get(message.author.id) + cdAmount;
        //si il reste du temps dans la collection
        if(timeNow < cdExpirationTime) {
            timeLeft = (cdExpirationTime -  timeNow) / 1000;
            return message.reply(`merci d'attendre ${timeLeft.toFixed(0)} seconde(s) avant de ré-utiliser la commande \`${command.help.name}\`.`);
        }            
    }
    //si l'id n'existe pas dans la collection
    tStamps.set(message.author.id, timeNow);
    //supprime votre id dans la collection tStamps après le cd
    setTimeout(() => tStamps.delete(message.author.id), cdAmount);
    //console.log(client.cooldowns);
     
    command.run(client, message, args);
}

