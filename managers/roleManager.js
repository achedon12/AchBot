const Main = require("../index");
const buttonManager = require("../managers/buttonManager")
const embedManager = require("../managers/embedManager")

module.exports = new class RoleManager{
    async initialise_stateur(Client) {

        let guild = await Client.guilds.cache.find(r => r.id === "965474854088343582");
        let channel = await guild.channels.fetch(Main.channel_id.roles);

        channel.send({
            embeds: [
                embedManager.getDefaultParamForEmbed("Cliquez sur les rôles pour recevoir les newsletter",Client,"Achedon12 - Communauté roles")
            ],
            components: [
                new buttonManager(Client)
                    .addButton("vidéos youtube",buttonManager.RED,"youtube",null,false,null,"🎥")
                    .addButton("annonces",buttonManager.GREEN,"annonce",null,false,null,"📢")
                    .addButton("annonces boutique",buttonManager.GREY,"boutique",null,false,null,"💰")
                    .getActionRow(),
            ]
        });
    }
}