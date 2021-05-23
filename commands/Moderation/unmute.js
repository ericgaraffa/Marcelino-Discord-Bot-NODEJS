const ms = require("ms");
const {MessageEmbed} = require("discord.js");
const { MESSAGES } = require ("../../util/constants");


module.exports.run = async (client, message, args) => {
    let user = message.guild.member(message.mentions.users.first());
    let muteRole = message.guild.roles.cache.find(r => r.name === 'muted');

    if(!user.roles.cache.has(muteRole.id)) return message.reply ("L'utilisateur mentionné n'est pas muté !");
    await user.roles.remove(muteRole.id);
    message.channel.send(`<@${user.id}> n'est plus muté .`);

    const embed = new MessageEmbed()
        .setAuthor(`${user.user.username} (${user.id})`, user.user.avatarURL())
        .setColor("#35f092")
        .setDescription(`**Action**: Unmute`)
        .setTimestamp()
        .setFooter(message.author.username, message.author.avatarURL());

    client.channels.cache.get('844952924613771354').send(embed);
};

module.exports.help = MESSAGES.COMMANDS.MODERATION.UNMUTE;