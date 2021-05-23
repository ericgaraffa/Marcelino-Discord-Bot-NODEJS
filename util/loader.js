const fs = require('fs');

const loadCommands = (client, dir = "./commands/") => {
    fs.readdirSync(dir).forEach(dirs => {
        //recupere tous les fichiers dans les sous dossiers
        const commands = fs.readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith('.js'));

        for (const file of commands) {
            //Recupere le nom de sfichier
            const getFileName = require (`../${dir}/${dirs}/${file}`);
            //range les fichier dans la collection
            client.commands.set(getFileName.help.name, getFileName);
            console.log(`Commande chargée : ${getFileName.help.name}`);  
        };
    });
};

const loadEvents = (client, dir = "./events/") => {
    fs.readdirSync(dir).forEach(dirs => {
        //recupere tous les fichiers dans les sous dossiers
        const events = fs.readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith('.js'));
        //console.log(events);
        //Récupere uniquement les events utiles à chaque appels
        for (const event of events) {
            //Recupere le nom des fichier
            const evt = require (`../${dir}/${dirs}/${event}`);
            const evtName = event.split(".")[0];
            client.on(evtName, evt.bind(null, client));
            console.log(`Evenement chargé : ${evtName}`);
        };
    });
};

module.exports ={
    loadCommands,
    loadEvents,
}