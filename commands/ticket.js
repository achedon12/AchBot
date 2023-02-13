const TicketManager = require("../managers/ticketManager");
const EmbedManager = require("../managers/embedManager");

module.exports.config = {
    name: "ticket",
    description: "ouvrir un ticket",
    pushable: false
}
module.exports.network = {
    name: "ticket",
    description: this.config.description,
}
module.exports.execute = async function (member, channel, guild, args, Client, interaction) {
    if (!await TicketManager.hasTicket(member)) {
        try {
            const ticket_id = await TicketManager.createTicket(member, Client);
            interaction.reply({
                embeds: [EmbedManager.getDefaultParamForEmbed("Ticket crée avec succès <#" + ticket_id + ">", Client)],
                ephemeral: true
            })
        } catch (e) {
            interaction.reply({
                embeds: [EmbedManager.getDefaultParamForEmbed("une erreur est survenue lors de la création du ticket", Client)],
                ephemeral: true
            })
        }
    } else {
        interaction.reply({
            embeds: [EmbedManager.getDefaultParamForEmbed("Vous ne pouvez pas ouvrir 2 tickets en même temps", Client)],
            ephemeral: true
        })
    }
}