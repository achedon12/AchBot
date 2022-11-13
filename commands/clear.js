const { moderatorID } = require("../data/RoleId.json");

module.exports.config = {
    name: "clear",
    description: "supprimer un certain nombre de message",
    permission : moderatorID,
    pushable: false
}

module.exports.network = {
    name: "clear",
    description: "supprimer un certain nombre de message",
    options: [
        {
            name: "message",
            description: "nombre de message",
            type: "INTEGER",
            required: true
        }
    ]
}

module.exports.execute = async function (member,channel,guild,args,Client,interaction){

    const amount = args[0];
    if(!amount || isNaN(args[0])){
        return interaction.reply("Veuillez un nombre valide");
    }
    const amountParsed = parseInt(amount);
    if(amountParsed > 100 || amountParsed < 0){
        return interaction.reply("Vous ne pouvez pas supprimer plus de 100 messages");
    }
    try{
        await channel.bulkDelete(amountParsed,true);
        interaction.reply("Vous avez bien supprimé les messages")
        const message = await interaction.reply(`Vous avez supprimé ${amount} message(s)`);
        setTimeout(() => message.delete(), 1000);
    }catch(e){
        interaction.reply("Vous ne pouvez pas supprimer de message datant de 14 jours ou plus")
    }

}
