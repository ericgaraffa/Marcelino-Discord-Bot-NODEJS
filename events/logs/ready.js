module.exports = client => {
    console.log(`Logged in as ${client.user.tag}`);
    client.user.setActivity("!help pour plus d'informations !", { type : 'PLAYING'})
}