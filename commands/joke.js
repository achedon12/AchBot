const BlaguesAPI = require('blagues-api');
const {discordToken} = require('../config.json');


module.exports.config = {
    name: "joke",
    description: "envoie une blague",
    pushable: false,
}

module.exports.network = {
    name: "joke",
    description: "envoie une blague",
    options: [
        {
            name: "type",
            description: "type de la blague",
            type: "STRING",
            required: false
        }
    ]
}

module.exports.execute = async function (member, channel, guild, args, Client, interaction) {
    const blagues = new BlaguesAPI(discordToken);
    let blague;
    if(args[0] === undefined){
        blague = await blagues.randomCategorized(blagues.categories.GLOBAL);
    }else{
        let list = ["global","dev","dark","beauf","blondes"];
        if(list.includes(args[0])){
            switch (args[0]){
                case "global":
                    blague = await blagues.randomCategorized(blagues.categories.GLOBAL);
                    break;
                case "dev":
                    blague = await blagues.randomCategorized(blagues.categories.DEV);
                    break;
                case "dark":
                    blague = await blagues.randomCategorized(blagues.categories.DARK);
                    break;
                case "beauf":
                    blague = await blagues.randomCategorized(blagues.categories.BEAUF);
                    break;
                case "blondes":
                    blague = await blagues.randomCategorized(blagues.categories.BLONDES);
                    break;
            }
        }else{
            blague = await blagues.randomCategorized(blagues.categories.GLOBAL);
        }
    }
    interaction.reply(blague.joke);
    setTimeout(()=>{channel.send(blague.answer)},5000);

}