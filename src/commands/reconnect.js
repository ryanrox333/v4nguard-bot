const {MessageEmbed} = require('discord.js');
const {color} = require('../config.json');
let {shield, cross, check} = require('../emoji');
const SQL = require('../modules/SQL');

let remb = new MessageEmbed()
    .setColor(color)
    .setDescription(`Manually reconnecting to the database. Please wait...`)
    .setTimestamp()
    .setFooter({text: `V4nguard Bot by iq#2360`});

module.exports = {
    category: 'Tools',
    description: 'Reconnect to the database',

    slash: false,
    testOnly: false,

    callback: async ({message, interaction, client, args}) => {
        message.reply("no")
        //let msg = await message.channel.send({embeds: [remb]});
        //try {
        //    await SQL.connection.end();
        //    msg.delete()
        //    SQL.startup()
        //    remb.setColor(`GREEN`)
        //    remb.setDescription(`Successfully reconnected to the database.`)
        //    message.channel.send({embeds: [remb]})
        //} catch (e) {
        //    console.log(e);
        //    remb.setDescription("Failed to disconnect from database.");
        //    msg.delete()
        //    message.channel.send({embeds: [remb]});
        //}
    }
}