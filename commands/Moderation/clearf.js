const {MessageEmbed} = require("discord.js");
const { MESSAGES } = require ("../../util/constants");

module.exports.run = async (client, message, args) => {
    let user = message.guild.member(message.mentions.users.first());
    if(isNaN(args[1]) || (args[1] < 1 || args[1] > 100)) return message.reply ('il faut spécifier un ***nombre*** entre 1 et 100');

    const messages = (await message.channel.messages.fetch({
        limit: 100,
        before: message.id,
    })).filter(a => a.author.id === user.id).array();

    messages.length = Math.min(args[1], messages.length)

    if(messages.length === 0 || !user) return message.reply ('aucun message à supprimer sur cet utilisateur (ou cet utilisateur n\'exsite pas.');

    if(messages.length === 1) await messages[0].delete();
    else await message.channel.bulkDelete(messages);

    message.delete();

    const embed = new MessageEmbed()
        .setAuthor(message.author.username, message.author.avatarURL())
        .setColor("#287db5")
        .setDescription(`**Action**: Clear\n**Nombre de message :** ${args[1]} \n**Utilisateur :** ${args[0]} \n**Salon :** ${message.channel}`)

client.channels.cache.get('844952924613771354').send(embed);
}

module.exports.help = MESSAGES.COMMANDS.MODERATION.CLEARF;