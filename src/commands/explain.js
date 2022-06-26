const {MessageEmbed} = require('discord.js');
const {color} = require('../config.json');
let {shield, cross, check} = require('../emoji');
let explains = require("../modules/explanations.json");
const { distance, closestMatch } = require("closest-match");

let explainemb = new MessageEmbed()
.setColor(color)
.setDescription(`We couldn't find the explanation for what you are looking for.`)
.setFooter({text: 'V4nguard Bot by iq#2360'})
.setTimestamp();

module.exports = {
    category: 'Tools',
    description: 'Explain stuff.',

    slash: false,
    testOnly: false,

    minArgs: 0,
    maxArgs: 50,

    callback: ({message, interaction, client, args}) => {
        let explainlist = []
        let exp = [];
        let tmp = 0;
        let max;
        explains.forEach(explain => {
            explainlist.push(explain.explain)
        });
        if (!args.length) {
            message.reply("You need to use one of the following explanations...")
            explainemb.setTitle(`List`)
            explainemb.setDescription(`${explainlist.join("\n")}`);
            message.channel.send({embeds: [explainemb]});
            return;
        }
        let search = args.slice(0).join(" ");
        let cm = closestMatch(search, explainlist, true)
        cm.forEach(explain => {
            let priority = distance(search, explain)
            exp.push({"explain": explain, "priority": priority});
            //console.log(exp)
        })
        if(exp.length == 0){
            message.channel.send({embeds: [explainemb]});
            return;
        }
        let txp = 0
        exp.forEach(e => {
            if(e.priority <= tmp || txp === 0){
                tmp = e.priority;
                explains.forEach(explain => {
                    if(e.explain == explain.explain){
                        max = explain;
                    }
                })
            }
            txp++;
        })
        if(exp === null || exp === undefined) {
            message.channel.send({embeds: [explainemb]});
            return;
        }
        explainemb.setDescription(`${max.description}`);
        message.channel.send('Explaining `'+max.explain+'`...');
        message.channel.send({embeds: [explainemb]});
    }
}