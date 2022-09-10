const { moderatorID } = require("../data/RoleId.json");

module.exports.config = {
    name: "clear",
    description: "supprimer un certain nombre de message",
    permission : moderatorID
}
module.exports.execute = async function (member,channel,guild,args,Client,message){
    if(args.length >= 2){
        const amount = args[1];
        if(!amount || isNaN(args[1])){
            return message.reply("Veuillez un nombre valide");
        }
        const amountParsed = parseInt(amount);
        if(amountParsed > 100 || amountParsed < 0){
            return message.reply("Vous ne pouvez pas supprimer plus de 100 messages");
        }
        try{
            await channel.bulkDelete(amountParsed,true);
            const message = await channel.send(`Vous avez supprimé ${amount} message(s)`);
            setTimeout(() => message.delete(), 1000);
        }catch(e){
            message.channel.send("Vous ne pouvez pas supprimer de message datant de 14 jours ou plus")
        }

    }else{
        message.reply("Veuillez entrer un nombre valide");
    }
}
