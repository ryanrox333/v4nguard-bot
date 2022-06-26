const {MessageEmbed} = require('discord.js');
const {color} = require('../config.json');
let {shield, cross, check} = require('../emoji');
let SQL = require('../modules/SQL')
let SQLITE = require('../modules/SQLITE')
let axios = require('axios');

module.exports = {
    category: 'Tools',
    description: 'Get V4nguard status',
    
    slash: false,
    testOnly: false,

    callback: async ({message, interaction, client, args}) => {
        // Fetch for different servers, databases, etc.
        let db;
        let sqll;
        let server;
        let bungie;
        let wl;
        // Sending a message first so that the user knows that the command is running
        let msg = await message.channel.send(`Checking the statuses of the servers...`);

        // Send a GET request to the V4nguard API
        try {
            let a = await axios.get('http://34.68.134.90:446/Status');
            server = await a.data.server_online;
            wl = await a.data.whitelist_enabled;
        } catch (err) {
            server = false;
            wl = false;
        }
        
        // Get the database
        try {
            let sql = await SQL.query('SELECT * FROM `destiny_users`');
            db = true;
        } catch (e) {
            db = false;
        }

        // Try SQLite
        try {
            SQLITE.db.serialize(() => {
                SQLITE.db.run(`SELECT * FROM warns`)
            })
            sqll = true;
        } catch (e) {
            console.log(e)
            sqll = false;
        }

        // Get the bungie CDN
        try {
            let b = await axios.get('http://cdn.deadorbit.net/',{ validateStatus: false });
            bungie = true;
        } catch (e) {
            bungie = false;
        }

        // Send the embed
        let embed = new MessageEmbed()
            .setColor(color)
            .setTitle('V4nguard Status')
            .setDescription('Checked 4 statuses.')
            .setFooter({text: `V4nguard Bot by iq#2360`})
            .setTimestamp();
        await msg.delete();
        embed.addField(`Server`, server ? '✅ Server is up, got response.' : '❌ No response, offline most likely.', true);
        embed.addField(`Database`, db ? '✅ Database is up, got response.' : '❌ No response, offline most likely.', true)
        embed.addField(`SQLite`, sqll ? '✅ SQLite is up, got response.' : '❌ No response, offline most likely.', true)
        embed.addField(`Bungie CDN`, bungie ? '✅ CDN is up, got response.' : '❌ No response, offline most likely.', true)
        if(wl) embed.addField(`Whitelist`, `⚠️ Whitelist is enabled.`, true)
        message.channel.send({embeds: [embed]});
    }
}