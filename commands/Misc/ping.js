const { MESSAGES } = require ("../../util/constants");



module.exports.run = (client, message, args) => {
    message.channel.send('Test réussi ! Le bot marche !');
}

module.exports.help = MESSAGES.COMMANDS.MISC.PING;