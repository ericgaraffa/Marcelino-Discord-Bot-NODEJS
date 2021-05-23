const { MessageEmbed, Message} = require ("discord.js");
const { prefix } = require ("../../config");
const { readdirSync, readdir } = require ("fs");
const categoryList = readdirSync('./commands');
const { MESSAGES } = require ("../../util/constants");

module.exports.run = (client, message, args) => {
    if(!args.length) {
        const embed = new MessageEmbed()
        .setColor("#36393F")
        .addField("Liste des commandes", `Une liste des toutes les sous-catégories disponibles et leurs commandes \nPour plus d'informations sur une commande. Tapez \`${prefix}help <command_name>\``)

        for (const category of categoryList) {
            embed.addField(
                `${category}`,
                `${client.commands.filter(cat => cat.help.category === category.toLowerCase()).map(cmd => cmd.help.name).join(', ')}`
            );
        };

        return message.channel.send(embed);
    } else {
        //recupere les aliases si il en a (permet d'appeller la commande autrement visible dans !help <function>)
        const command = client.commands.get(args[0]) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(args[0]));
        if(!command) return message.reply("cette commande n'existe pas !");
        //création de l'embed
        const embed = new MessageEmbed()
            .setColor("#36393F")
            .setTitle(`\`${command.help.name}\``)
            .addField("Description", `${command.help.description} (cd : ${command.help.cooldown} secs)`)
            .addField("Utilisation", command.help.usage ? `${prefix}${command.help.name} ${command.help.usage}` : `${prefix}${command.help.name}`, true)

        if(command.help.aliases.length > 1) embed.addField("Alias", `${command.help.aliases.join(', ')}`, true);
        return message.channel.send(embed);
    }
};

module.exports.help = MESSAGES.COMMANDS.MISC.HELP;
