const {MessageEmbed} = require('discord.js');
const {color} = require('../config.json');
let SQLITE = require('../modules/SQLITE');
let {shield, cross, check} = require('../emoji');

module.exports = {
    category: 'Tools',
    description: 'Wipe the SQL table',

    slash: false,
    testOnly: false,

    minArgs: 0,
    maxArgs: 50,

    callback: async ({message, interaction, client, args}) => {
        if(!message.member.permissions.has("MANAGE_MESSAGES")) return;

        if(!args.length){
            return message.reply(`Need table`)
        }
        SQLITE.db.serialize(() => {
            SQLITE.db.run(`DROP TABLE ${args[0]}`);
        })
        message.channel.send(`Table ${args[0]} has been wiped`)
    }
}