const { MessageEmbed } = require ("discord.js");

module.exports = async (client, channel)=> {
    const fetchGuildAuditLogs = await channel.guild.fetchAuditLogs({
        limit : 1,
        type : 'CHANNEL_DELETE'
    });

    const latestChannelDeleted = fetchGuildAuditLogs.entries.first();
    //console.log(latestChannelDeleted);
    const { executor } = latestChannelDeleted;

    const embed = new MessageEmbed()
        .setAuthor(`Création d'un nouveau salon`)
        .setColor("#dc143c")
        .setDescription(`**Action**: Suppression de salon\n **Salon supprimé ** : ${channel.name}`)
        .setTimestamp()
        .setFooter(executor.username, executor.displayAvatarURL());   

    client.channels.cache.get('844952924613771354').send(embed);
}
