const {getDatabaseToArray} = require("../managers/XpManager")
const {EmbedBuilder} = require("discord.js");

module.exports.config = {
    name: "leaderboard",
    description: "voir le classement xp",
    pushable: false,
}

module.exports.network = {
    name: "leaderboard",
    description: "voir le classement xp",
}

module.exports.execute = async function (member, channel, guild, args, Client, interaction){
    let tab = getDatabaseToArray();

    let fields = [];
    for (let i = 0; i < tab.length; i++) {
        fields.push({name: `Numéro ${i+1}`, value : `${guild.members.cache.get(tab[i][0])}, level : ${tab[i][1].level}`})
    }

    const embed = new EmbedBuilder()
        .setColor("#00ffea")
        .setTitle(`**Leaderboard xp**`)
        .addFields(
            fields
        )
        .setTimestamp()
        .setFooter({
            text: "Achedon12 - Communauté"
        });
    interaction.reply({embeds: [embed]});
}