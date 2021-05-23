//fs sert a utiliser le système de lecture de fichier (readdirSync)

//discord permet l'utilisation de la lib discord.js avec plusieurs classe tel que client ...
const { Client, Collection } = require('discord.js');
const { prefix, token } = require ('./config.js');
const { loadCommands, loadEvents} = require('./util/loader');

const client = new Client();

["commands", "cooldowns"].forEach(x => client[x] = new Collection());

//chargement des différentes commandes
loadCommands(client);
//chargement des différent events.
loadEvents(client);


client.login(token);