const {EmbedBuilder} = require("discord.js");

class embedManager {
    getDefaultParamForEmbed(text, Client, title = "Achedon12 - Communauté") {
        return new EmbedBuilder()
            .setTitle(title)
            .setColor("#fde43a")
            .setDescription(text)
            .setFooter({ text: 'Achedon12 - Communauté', iconURL: Client.user.avatarURL() })
    }
}

module.exports = new embedManager();