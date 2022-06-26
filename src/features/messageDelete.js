const {MessageEmbed} = require('discord.js');
const {color} = require('../config.json');
let {shield, cross, check} = require('../emoji');

module.exports = (client, instance) => {
    let s = client.emojis.cache.get(shield);
    let c = client.emojis.cache.get(cross);
    let ch = client.emojis.cache.get(check);
    client.on('messageDelete', async (message) => {
        let lchannel = message.guild.channels.cache.find(ch => ch.name === "other-logs")
        if(lchannel == null){
            return;
        }
        if(message.author.bot){
            return;
        }
        let logemb = new MessageEmbed()
        .setTitle("Message Deleted")
        .setColor(color)
        .setThumbnail(message.author.avatarURL())
        .addField("User", `<@${message.author.id}> (${message.author.tag})`, true)
        .addField("Channel", `<#${message.channel.id}>`, true)
        .addField("Message", message.content, true)
        .setFooter({text: 'V4nguard Bot by iq#2360'})
        .setTimestamp();
        lchannel.send({embeds: [logemb]});
    })
}