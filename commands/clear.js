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
            required: false
        }
    ]
}

module.exports.execute = async function (member, channel, guild, args, Client, interaction){

    if (args[0] > 100 || args[0] === undefined) {
        args[0] = 100;
    }

    try{
        await channel.bulkDelete(args[0],true);
        interaction.reply("Vous avez bien supprimé les messages")
    }catch(e){
        interaction.reply("Vous ne pouvez pas supprimer de message datant de 14 jours ou plus")
    }

}
