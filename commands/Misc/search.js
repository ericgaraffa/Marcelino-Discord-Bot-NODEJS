const {MessageEmbed} = require("discord.js");
const { MESSAGES } = require ("../../util/constants");

module.exports.run = (client, message, args) => {
    message.channel.send(`https://www.google.fr/search?q=${args.join("+")}`);

    const embed = new MessageEmbed()
        .setAuthor(message.author.username, message.author.avatarURL())
        .setColor("#ffa500")
        .setDescription(`**Action**: recherche`)
        .setTimestamp()
        .setFooter(message.author.username, message.author.avatarURL());
    client.channels.cache.get('844952924613771354').send(embed);
}

module.exports.help = MESSAGES.COMMANDS.MISC.SEARCH;
