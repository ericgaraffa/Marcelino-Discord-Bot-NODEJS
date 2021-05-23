const {MessageEmbed} = require("discord.js");

module.exports = (client, message) => {
    const user = message.author;
    //Si c'est un bot qui envoie un message
    if(user.bot) return;

    const embed = new MessageEmbed()
    .setAuthor(`${user.username} (${user.id})`)
    .setColor("#ffa500")
    .setDescription(`**Action**: ouverture ticket\n**Raison**! ${message.content}\nUtilisateur ${user}`)
    .setThumbnail(user.avatarURL())
    .setTimestamp()
    .setFooter(user.username, user.avatarURL());
user.send("Nous avons reçu votre ticket, on vous répondra dès que possible");
//Envoie sur un channel précis.
client.channels.cache.get('844952924613771354').send(embed);
}