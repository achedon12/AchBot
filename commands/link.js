
module.exports.config = {
    name: "link",
    description: "lien des réseaux sociaux",
    pushable: false,
}

module.exports.network = {
    name: "link",
    description: "lien des réseaux sociaux"
}

module.exports.execute = async function (member, channel, guild, args, Client, interaction){
    interaction.reply("**Voici les liens des réseaux sociaux**\n\n" +
        "**Youtube**\nhttps://www.youtube.com/@achedon12" +
        "**Twitch**\nhttps://www.twitch.tv/achedon_12" +
        "**Twitter**\nhttps://twitter.com/achedon12");
}