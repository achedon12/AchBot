const {prefix} = require("../config.json");
const {adminID} = require("../data/RoleId.json");
const {DMChannel} = require("discord.js");

module.exports.config = {
    name: "mp",
    description: "envoyer un message privé au joueur",
    permission : adminID
}
module.exports.execute = async function (member,channel,guild,args,Client,message){
    if(args.length >= 3){

        const user = message.mentions.users.first() ?? message.member.user;
        if(user === undefined){
            message.reply("Veuillez entrer une id")
            return;
        }

        let msg = "";
        for (let i = 0; i < args.length; i++) {
            if(args[i] !== member.toString()){
                msg += " " + args[i];
            }
        }
        if(user.bot){
            return message.reply("Vous ne pouvez pas envoyer de message privé à cette personne");
        }
        user.createDM(true).then( channel => {
                channel.send(msg.substring(prefix.length+2));
            }
        )
    }else{
        message.reply("!mp <player> <message>")
    }
}