module.exports = (client, messageReaction, user) => {
    const message = messageReaction.message;
    const member = message.guild.members.cache.get(user.id);
    const emoji = messageReaction.emoji.name;
    const channel = message.guild.channels.cache.find(c => c.id === "844953007841869854");
    const membreRole = message.guild.roles.cache.get("844944908828803082");
    const ModerateurRole = message.guild.roles.cache.get("844699623065911296");
    if (member.user.bot) return;

    if(["1️⃣", "2️⃣"].includes(emoji) && message.channel.id === channel.id) {
        switch (emoji) {
            case "1️⃣": 
                member.roles.remove(membreRole);
                message.channel.send(`Le rôle ${membreRole.name} a été supprimé avec succès !`);
                break;
            case "2️⃣": 
                member.roles.remove(ModerateurRole);
                message.channel.send(`Le rôle ${ModerateurRole.name} a été supprimé avec succès !`);
                break;
        }
    }
}