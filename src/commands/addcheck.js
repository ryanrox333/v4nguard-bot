const {MessageEmbed} = require('discord.js');
const {color} = require('../config.json');
let {shield, cross, check} = require('../emoji');
let checks = require('../modules/checks.json');
let fs = require('fs')

let path = require('path')

let checkfile = path.join(process.cwd(), 'src', 'modules', 'checks.json')

module.exports = {
    category: 'Tools',
    description: 'Add to the check list',

    slash: false,
    testOnly: false,

    minArgs: 0,
    maxArgs: 50,

    callback: async ({message, interaction, client, args}) => {
        if(!args.length) return message.reply("Format: `d!addcheck <name> <splice> <check>`")
        if(!message.member.permissions.has("MANAGE_MESSAGES")){
            return message.reply("You do not have enough permission to use this command.")
        }
        let search = args.slice(4).join(" ");
        if(search === null || search === undefined) return message.reply("No check was found in the arguments.")

        let c2 = checks;
        c2.push({"name":`${args[0]}`,"splice":args[1],"checkrecc":args[2],"recc":args[3],"check":`${search}`});
        fs.writeFile(checkfile, JSON.stringify(c2), (err) => {
            if(err) {
                console.log(err)
                message.reply("There was an error adding the check.")
                return;
            }
            message.reply(`Check added:\n\`Name: ${args[0]}\`\n\`Splice: ${args[1]}\`\n\`Check Reccomended: ${args[2]}\`\n\`Reccomended: ${args[3]}\`\n\`Check: ${search}\``)
        })
    }
}