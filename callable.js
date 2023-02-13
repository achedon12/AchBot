const embedManager = require("./managers/embedManager");
const TicketManager = require("./managers/ticketManager");
const {TextChannel, Interaction, Role} = require("discord.js");
const Main = require("./index");
/**
 *
 * @param {buttonFactory} buttonFactory
 * @param {Client} Client
 */
module.exports.initialiseBt = function (buttonFactory, Client) {

    buttonFactory.addCallable("close", async (btnInteraction) => {
        await TicketManager.closeTicket(btnInteraction.member, btnInteraction.message.channel, Client)
    });

    buttonFactory.addCallable("delete", async function (btnInteraction, Client) {
        btnInteraction.message.channel.send({
            embeds: [
                embedManager.getDefaultParamForEmbed("Le ticket va être fermé d'ici 5 secondes", Client, "Achedon12 - Communauté Ticket")
            ]
        });
        setTimeout(() => {
            try {
                btnInteraction.message.channel.delete();
            }catch (e) {
                console.log(e);
            }
        }, 5000);
    });

    /**
     * @param {Interaction} btnInteraction
     */
    buttonFactory.addCallable("annonce",async function (btnInteraction, Client) {
        await fait(Client, Main.role_id.notifAnnonce, btnInteraction, "annonce")
    });
    buttonFactory.addCallable("youtube",async function (btnInteraction, Client) {
        await fait(Client, Main.role_id.notifYoutube, btnInteraction, "youtube")
    });
    buttonFactory.addCallable("boutique",async function (btnInteraction, Client) {
        await fait(Client, Main.role_id.notifBoutique, btnInteraction, "boutique")
    });

    async function fait(Client,role_id,btnInteraction,type){
        let role = await Client.guilds.cache.find(g => g.id === btnInteraction.guildId).roles.cache.find(r => r.id === role_id);
        if (role instanceof Role) {
            if ((await btnInteraction.member.roles.cache.find(r => r.id === role.id)) !== undefined) {
                await btnInteraction.member.roles.remove(role)
                btnInteraction.reply({
                    embeds: [
                        embedManager.getDefaultParamForEmbed("Vous êtes maintenant désabonné à une nouvelle newsletter", Client, "Achedon12 - Communauté roles")
                    ],
                    ephemeral: true
                })
            }else{
                await btnInteraction.member.roles.add(role)
                btnInteraction.reply({
                    embeds: [
                        embedManager.getDefaultParamForEmbed("Vous êtes maintenant abonné à une nouvelle newsletter", Client, "Achedon12 - Communauté roles")
                    ],
                    ephemeral: true
                })
            }
        }
    }
}