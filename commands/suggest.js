const EmbedManager = require("../managers/embedManager");
const Main = require("../index");

module.exports.config = {
    name: "suggest",
    description: "proposer une idée",
    pushable: false
}
module.exports.network = {
    name: "suggest",
    description: "proposer une idée",
    options: [
        {
            name: "suggestion",
            description: "suggestion à proposer",
            type: "STRING",
            required: true
        }
    ]
}
module.exports.execute = async function (member, channel, guild, args, Client, interaction) {

    const suggestion = args.join(" ");
    const suggestChannel = Client.channels.cache.get(Main.channel_id.suggest);
    const message = await suggestChannel.send({
        embeds: [EmbedManager.getDefaultParamForEmbed("Suggestion de " + member.user.username + ":", Client).setDescription(suggestion)]
    });

    const love = guild.emojis.cache.find(emoji => emoji.name === "love");
    const dead = guild.emojis.cache.find(emoji => emoji.name === "dead");
    const die = guild.emojis.cache.find(emoji => emoji.name === "die");

    await message.react(love);
    await message.react(dead);
    await message.react(die);
    interaction.reply({
        embeds: [EmbedManager.getDefaultParamForEmbed("Votre suggestion a bien été envoyée", Client)],
        ephemeral: true
    })

}