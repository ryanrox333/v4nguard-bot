const {MessageEmbed} = require('discord.js');
const {color} = require('../config.json');
let {shield, cross, check} = require('../emoji');
const { connection } = require('../modules/SQL');
let sql = require('../modules/SQL');

let xuremb = new MessageEmbed()
    .setColor(color)
    .setTitle(`Xur | Shop Contents`)
    .setDescription(`:x: Unable to load xur's shop contents.`)
    .setTimestamp()
    .setFooter({text: `V4nguard Bot by iq#2360`});

module.exports = {
    category: 'Tools',
    description: 'Xur Shop Contents',

    slash: false,
    testOnly: false,

    callback: async ({message, interaction, client, args}) => {
        let xur = await connection.query("SELECT * FROM destiny_vendors where shop_tag = 'xur'", (error, result, fields) => {
            if (error) throw error;
            let j = JSON.parse(result[0].shop_contents)
            let s = JSON.parse(result[0].shop_special)
            let n = JSON.parse(result[0].shop_noswap)
            let sj;
            let ss;
            let sn;
            if(j.items == undefined) {
                sj = "None"
            }
            if (s.items == undefined) {
                ss = "None"
            }
            if (n.items == undefined) {
                sn = "None"
            }
            xuremb.setDescription(`Xur's shop content from this weekend.`)
            xuremb.addField(`Weekly Store`, sj, true)
            xuremb.addField(`Special Items`, ss, true)
            xuremb.addField(`Permanent Items`, sn, true)
            message.reply({embeds: [xuremb]})
        })
    }
}