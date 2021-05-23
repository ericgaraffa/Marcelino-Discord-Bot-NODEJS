const { MessageEmbed } = require ("discord.js");

module.exports = async (client, message)=> {
    const fetchGuildAuditLogs = await message.guild.fetchAuditLogs({
        limit : 1,
        type : 'MESSAGE_DELETE'
    });

    const latestMessageDeleted = fetchGuildAuditLogs.entries.first();
    //console.log(latestMessageDeleted);
    const { executor } = latestMessageDeleted;

    const embed = new MessageEmbed()
        .setAuthor(`Suppression d'un message`)
        .setColor("#dc143c")
        .setDescription(`**Action**: Suppression d'un message'\n **Message supprimé ** : ${message.content}\n **Auteur du message** :  ${message.author}`)
        .setTimestamp()
        .setFooter(executor.username, executor.displayAvatarURL());   

    client.channels.cache.get('844952924613771354').send(embed);
}
