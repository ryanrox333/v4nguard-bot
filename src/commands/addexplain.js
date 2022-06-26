let explains = require("../modules/explanations.json");
let fs = require('fs')
let path = require('path')

let explainfile = path.join(process.cwd(), 'src', 'modules', 'explanations.json')

module.exports = {
    category: 'Tools',
    description: 'Add to the explain list',

    slash: false,
    testOnly: false,

    minArgs: 0,
    maxArgs: 50,

    callback: async ({message, interaction, client, args}) => {
        if(!message.member.permissions.has("MANAGE_MESSAGES")){
            message.reply("You don't have the permission to do that!")
            return;
        }
        
        if(!args.length) {
            message.reply("You need to set a name for the explanation.")
            return;
        }

        let msg;

        try {
            msg = await message.channel.messages.fetch(message.reference.messageId);
        } catch(e) {
            message.reply("You need to reply to a message to add it to the explanation list.")
            return;
        }

        let search = args.join(" ");

        let e2 = explains;
        e2.push({"explain":`${search}`,"description":`${msg.content}`});
        fs.writeFile(explainfile, JSON.stringify(e2), (err) => {
            if(err) {
                console.log(err)
                message.reply("There was an error adding the explanation.")
                return;
            }
            message.reply("Explain added!")
        })
    }
}