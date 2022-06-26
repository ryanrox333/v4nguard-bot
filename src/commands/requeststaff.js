const {MessageEmbed} = require('discord.js');
const {color} = require('../config.json');
let {shield, cross, check} = require('../emoji');

module.exports = {
    category: 'Moderation',
    description: 'Request staff',

    slash: false,
    testOnly: false,

    callback: async ({message, interaction, client, args}) => {
        let msg;
        try {
            msg = await message.channel.messages.fetch(message.reference.messageId);
        } catch(e) {
            message.reply("You need to reply to request for staff.")
            return;
        }

        let lchannel = message.guild.channels.cache.find(ch => ch.name === "staff-request");
        if(lchannel == null){
            message.reply("There is no staff-request channel.")
            return;
        }
        let embed = new MessageEmbed()
            .setColor(color)
            .setTitle("Staff Request")
            .setDescription(`[Click to go to message](${msg.url})`)
            .addField(`User`, `${msg.author.tag}`, true)
            .addField(`Content`, `${msg.content}`, true)
            .setThumbnail(msg.author.avatarURL())
            .setFooter({text: 'V4nguard Bot by iq#2360'})
            .setTimestamp();
        lchannel.send({embeds: [embed]});
    }
}