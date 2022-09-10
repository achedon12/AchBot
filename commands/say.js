const {prefix} = require("../config.json");
const {moderatorID} = require("../data/RoleId.json");

module.exports.config = {
    name: "say",
    description: "faire un message d'annonce",
    permission : moderatorID
}
module.exports.execute = async function (member,channel,guild,args,Client,message){
    if(args.length >= 2){
        let msg = "";
        for (let i = 0; i < args.length; i++) {
            msg +=  " " + args[i];
        }
        channel.send(msg.substring(prefix.length + 3));
        setTimeout(()=>{message.delete()},500);
    }else{
        message.reply("Veuillez entrer un message valide");
    }
}