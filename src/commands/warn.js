const {MessageEmbed} = require('discord.js');
const {color} = require('../config.json');
let SQLITE = require('../modules/SQLITE');
let {shield, cross, check} = require('../emoji');

module.exports = {
    category: 'Moderation',
    description: 'Warn a user.',

    slash: false,
    testOnly: false,

    minArgs: 0,
    maxArgs: 50,

    callback: ({message, interaction, client, args}) => {
        let u = message.mentions.users.first() || message.guild.members.cache.find(u => u.id === args[0])?.user;
        let um = message.guild.members.cache.find(u => u.id === u.id) || null;
        if(!message.member.permissions.has("MANAGE_MESSAGES")){
            let e = new MessageEmbed()
            .setColor(color)
            .setDescription(`:x: You do not have enough permission to use this command.`)
            .setFooter({text: 'V4nguard Bot by iq#2360'})
            .setTimestamp();
            message.reply({embeds: [e]});
            return;
        }
        if(u == null){
            let e = new MessageEmbed()
            .setColor(color)
            .setDescription(`:x: You need to add a user you want to warn. Returned ${u}!`)
            .setFooter({text: 'V4nguard Bot by iq#2360'})
            .setTimestamp();
            message.reply({embeds: [e]});
            return;
        }
        if(um.permissions.has("MANAGE_MESSAGES")){
            let e = new MessageEmbed()
            .setColor(color)
            .setDescription(`:x: That user cannot be warned.`)
            .setFooter({text: 'V4nguard Bot by iq#2360'})
            .setTimestamp();
            message.reply({embeds: [e]});
            return;
        }
        let search = args.slice(1).join(" ");
        if(search == "" || search == null) return message.reply("You need a reason!")
        let lchannel = message.guild.channels.cache.find(ch => ch.name === "punishments-logs")
        if(lchannel == null){
            message.channel.send("No log channel was found!")
        } else {
            let logemb = new MessageEmbed()
            .setTitle("Warned User")
            .setColor(color)
            .setThumbnail(u.avatarURL())
            .addField("User", `<@${u.id}> (${u.tag})`, true)
            .addField("Moderator", `<@${message.author.id}> (${message.author.tag})`, true)
            .addField("Reason", search, true)
            .setFooter({text: 'V4nguard Bot by iq#2360'})
            .setTimestamp();
            lchannel.send({embeds: [logemb]});
        }
        message.reply(`${u.tag} has been warned! Reason: ${search}`);
        SQLITE.db.serialize(() => {
            SQLITE.db.run(`INSERT INTO warns (user_id, issuer_id, reason) VALUES (?, ?, ?)`, [u.id, message.author.id, search]);
        });
    }
}