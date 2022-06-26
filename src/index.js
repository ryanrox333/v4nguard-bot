const discordjs = require('discord.js');
const WOKCommands = require('WOKCommands');
const path = require('path');
const {token, color} = require('./config.json');
const SQL = require('./modules/SQL');
const SQLITE = require('./modules/SQLITE');

const { Intents } = discordjs;

const client = new discordjs.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGE_TYPING,
        Intents.FLAGS.GUILD_PRESENCES
    ],
});

client.on("ready", async () => {
    SQL.startup();
    SQLITE.db.serialize(() => {
        SQLITE.db.run(`CREATE TABLE IF NOT EXISTS warns (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id TEXT,
            issuer_id TEXT,
            reason TEXT
        )`)
    })
    client.user.setPresence({ activities: [{ name: 'Destiny' }], status: 'dnd' });
    new WOKCommands(client, {
        commandsDir: path.join(__dirname, 'commands'),
        featuresDir: path.join(__dirname, 'features'),
        botOwners: ['353884565674393602', '550672109995687946'],
        disabledDefaultCommands: ['help'],
    }).setDefaultPrefix('d!').setColor(color).setDisplayName('V4nguard');
});

client.login(token);