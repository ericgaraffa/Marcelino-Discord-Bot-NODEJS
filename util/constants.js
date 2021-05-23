//Tout est visible sur discord via le !help
const MESSAGES = {
    COMMANDS : {
        DEVOIR: {
            DELDEVOIR :{
                //Nom de la commande
                name : "deldevoir",
                //Montre de quel manière peut on appeller la commande, ici on peu appeller !deldevoir par !rm aussi
                aliases: ['deldevoir', 'rm'],
                //Categorie de la commande
                category: 'devoir',
                //Description afficher dans le !help <commande>
                description: "Permet d'effacer un devoir via son ID ",    
                //temps nécessaire avant de pouvoir rappeller la commande
                cooldown : 5,
                //Explication en cas d'appel de !deldevoir par exemple
                usage : '**<ID_du_devoir>**',
                //si l'utilisateur est admin
                isUserAdmin : false,
                //si l'utilisateur a les permissions
                permissions : false,
                //s'il faut des arguments pour faire marcher la commande
                args : true
            },
            MODIFDEVOIR : {
                name : "modifdevoir",
                aliases: ['modifdevoir'],
                category: 'devoir',
                description: "Permet d'ajouter un devoirs a la base de données! ",    
                cooldown : 5,
                usage : '**<id_du_devoir> <nom> <matiere> <année> <mois> <jour>**',
                isUserAdmin : false,
                permissions : false,
                args : true
            },
            ADDDEVOIR : {
                name : "adddevoir",
                aliases: ['adddevoir'],
                category: 'devoir',
                description: "Permet d'ajouter un devoirs a la base de données! ",    
                cooldown : 5,
                usage : '**<nom> <matiere> <année> <mois> <jour>**',
                isUserAdmin : false,
                permissions : false,
                args : true
            },
            LSDEVOIR : {
                name : "lsdevoir",
                aliases: ['lsdevoir', 'lsd'],
                category: 'devoir',
                description: "Permet d'afficher les devoirs qui sont stocker dans la base de données.",    
                cooldown : 5,
                usage : '',
                isUserAdmin : false,
                permissions : false,
                args : false
            }
        },
        MARKET:{
            LSINVENTAIRE : 
            {
                name : "lsinventaire",
                aliases: ['lsinventaire', 'lsi'],
                category: 'market',
                description: "Permet de voir son inventaire d'objet(s).",    
                cooldown : 5,
                usage : '',
                isUserAdmin : false,
                permissions : false,
                args : false
            },
            BUY : {
                name : "buy",
                aliases: ['buy'],
                category: 'market',
                description: "Permet d'acheter un item au market et de le mettre dans son inventaire.",    
                cooldown : 2,
                usage : '<id_item>',
                isUserAdmin : false,
                permissions : false,
                args : true
            },
            LSMARKET : {
                name : "lsmarket",
                aliases: ['lsmarket', 'lsm'],
                category: 'market',
                description: "Permet d'afficher les items du market avec leur prix.",    
                cooldown : 5,
                usage : '',
                isUserAdmin : false,
                permissions : false,
                args : false
            },
            VENTE : {
                name : "sell",
                aliases: ['sell'],
                category: 'market',
                description: "Permet de vendre un item.",
                cooldown : 3,
                usage : '<id_item>',
                isUserAdmin : false,
                permissions : false,
                args : true
            },
            POINTER : {
                name : "pointer",
                aliases: ['pointer'],
                category: 'market',
                description: "Permet de gagner 10 coins !",
                cooldown : 360,
                usage : '',
                isUserAdmin : false,
                permissions : false,
                args : false
            },
            PORTEFEUILLE : {
                name : "portefeuille",
                aliases: ['portefeuille', 'lsp'],
                category: 'market',
                description: "Permet de voir combien d'argent on dispose !",
                cooldown : 5,
                usage : '',
                isUserAdmin : false,
                permissions : false,
                args : false
            },
        },
        ADMIN : {
            EVAL : {
                name : "eval",
                aliases: ['eval'],
                category: 'admin',
                description: "Renvoie un code js testé !",    
                cooldown : 3,
                usage : '**<code_a_tester>**',
                isUserAdmin : false,
                permissions : true,
                args : true
            },
        },
        MISC: { 
            HELP : {
                name : "help",
                aliases: ['help'],
                category: 'misc',
                description: "Renvoie une liste de commandes ou les informations sur une seule !",    
                cooldown : 3,
                usage : '**<command_names>**',
                isUserAdmin : false,
                permissions : false,
                args : false
            },
            PING : {
                name : "ping",
                aliases: ['ping'],
                category: 'misc',
                description: "Test command",    
                cooldown : 10,
                usage : '',
                isUserAdmin : false,
                permissions : false,
                args : false
            },
            SAY : {
                name : "say",
                aliases: ['repeat', 'rep'],
                category: 'misc',
                description: "Répete le message d'un utilisateur",
                cooldown : 10,
                usage : '<votre_message>',    
                isUserAdmin : false,
                permissions : false,
                args : true
            },
            SEARCH : {
                name : "search",
                aliases: ['search'],
                category: 'misc',
                description: "Effectue une recherche sur google",
                cooldown : 10,
                usage : "<mot à rechercher>",
                isUserAdmin : false,    
                permissions : false,
                args : true
            },
        },
        MODERATION : {
            BAN : {
                name : "ban",
                aliases: ['ban'],
                category: 'moderation',
                description: "bannie un utilisateur",
                cooldown : 10,
                usage : "<@user> <raison>",
                isUserAdmin : true,    
                permissions : true,
                args : true
            },
            CLEAR : {
                name : "clear",
                aliases: ['clear'],
                category: 'moderation',
                description: "Efface un ou des message(s) spécifié",    
                cooldown : 5,
                usage : '<chiffre entre 1 et 99>',
                isUserAdmin : false,  
                permissions : true,
                args : true
            },
            CLEARF : {
                name : "clearf",
                aliases: ['clearf'],
                category: 'moderation',
                description: "Efface un ou des message(s) spécifié sur un utilisateur précis",    
                cooldown : 5,
                usage : '<@users> <chiffre entre 1 et 99>',
                isUserAdmin : true,  
                permissions : true,
                args : true
            },
            KICK : {
                name : "kick",
                aliases: ['kick'],
                category: 'moderation',
                description: "Expulse un utilisateur",
                cooldown : 10,
                usage : "<@user> <raison>",
                isUserAdmin : true,    
                permissions : true,
                args : true
            },
            MUTE : {
                name : "mute",
                aliases: ['mute'],
                category: 'moderation',
                description: "Mute un utilisateur",
                cooldown : 10,
                usage : "<@user> <temps>",
                isUserAdmin : true,    
                permissions : true,
                args : true
            },
            UNBAN : {
                name : "unban",
                aliases: ['unban'],
                category: 'moderation',
                description: "unban un utilisateur",
                cooldown : 10,
                usage : "<@user_id>",
                isUserAdmin : false,    
                permissions : true,
                args : true
            },
            UNMUTE : {
                name : "unmute",
                aliases: ['unmute'],
                category: 'moderation',
                description: "Unmute un utilisateur",
                cooldown : 10,
                usage : "<@user> <temps>",
                isUserAdmin : true,    
                permissions : true,
                args : true
            },
        },
        REACTIONS : {
           ALLROLES :{
            name : "allroles",
            aliases: ['allroles'],
            category: 'reactions',
            description: "Renvoie un message avec des réactions uniquement disponible dans le salon commandes !",    
            cooldown : 10,
            usage : '',
            isUserAdmin : false,
            permissions : false,
            args : false
           } ,
        },
    }
}

exports.MESSAGES = MESSAGES;