const {MessageEmbed} = require('discord.js');
const {color} = require('../config.json');
let SQLITE = require('../modules/SQLITE');
let {shield, cross, check} = require('../emoji');

module.exports = {
    category: 'Tools',
    description: 'Get warns of a user',

    slash: false,
    testOnly: false,

    minArgs: 0,
    maxArgs: 50,

    callback: async ({message, interaction, client, args}) => {
        let user = message.mentions.users.first() || message.author;
        await SQLITE.db.serialize(() => {
            SQLITE.db.all(`SELECT * FROM warns WHERE user_id = ${user.id}`, (err, rows) => {
                if(err) return message.channel.send(`${user} has no warns.`);
                let r;
                let n = 0;
                r = `\`\`\`ID | Warned by  | Reason\n`;
                rows.forEach(row => {
                    n++;
                    r += `${row.id}  | ${row.moderator}  | ${row.reason}\n`;
                });
                r += `\`\`\``;
                message.channel.send(`${user} has ${n} warns.\n${r}`);
                //let embed = new MessageEmbed()
                //.setTitle(`${user.tag}'s warns`)
                //.setColor(color)
                //.setFooter({text: 'V4nguard Bot by iq#2360'});
                //rows.forEach(row => {
                //    let u = client.users.fetch(row.issuer_id);
                //    embed.addField(`Warn ${row.id}`, `Reason: ${row.reason}\nWarned by: ${u.tag}`);
                //});
                //message.channel.send({embeds: [embed]});
            })
        });
    }
}