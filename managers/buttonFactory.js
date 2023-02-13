const embedManager = require("./embedManager");
const ticketManager = require("./ticketManager");
const buttonManager = require("../managers/buttonManager");
const initialiser = require("../callable");
const Main = require("../index");

class buttonFactory {
    allFunc = {};

    initialise(Client) {
        initialiser.initialiseBt(this, Client);
        this.addCallable("ticket",this.getcallableForBtnTicket("ticket"));
    }

    addCallable(buttonId, callback = null) {
        if (callback !== null) {
            this.allFunc[buttonId] = callback;
        }
    }

    btnExist(buttonId) {
        return this.allFunc[buttonId] !== undefined;
    }

    removeCallable(buttonId) {
        if (this.btnExist(buttonId)) {
            delete this.allFunc[buttonId];
        }
    }

    async call(buttonId, Interaction, Client, ...any) {
        await this.allFunc[buttonId](Interaction, Client, any);
    }

    getcallableForBtnTicket(ticket_name){
        return async function (Interaction, Client) {
            let member = Interaction.member;
            const embedManager = require("./embedManager");
            const ticketManager = require("./ticketManager");
            if (!await ticketManager.hasTicket(member)) {
                let roles = {
                    SendMessages: true,
                    ViewChannel: true,
                    ReadMessageHistory: true,
                    ManageMessages: true
                };
                try {
                    roles = [
                        {
                            "role_id": Main.role_id.moderatorID,
                            "roles": {
                                SendMessages: true,
                                ViewChannel: true,
                                ReadMessageHistory: true,
                                ManageMessages: true
                            }
                        },
                        {
                            "role_id": Main.role_id.member,
                            "roles": {
                                SendMessages: true,
                                ViewChannel: false,
                                ReadMessageHistory: true,
                                ManageMessages: false
                            }
                        }
                    ];
                    const ticket_id = await ticketManager.createTicket(member, Client, ticket_name, roles);
                    Interaction.reply({
                        embeds: [embedManager.getDefaultParamForEmbed("Ticket crée avec succès <#" + ticket_id + ">", Client)],
                        ephemeral: true
                    })
                } catch (e) {
                    console.log(e)
                    Interaction.reply({
                        embeds: [embedManager.getDefaultParamForEmbed("Une erreur est survenue lors de la création du ticket", Client)],
                        ephemeral: true
                    })
                }
            } else {
                Interaction.reply({
                    embeds: [embedManager.getDefaultParamForEmbed("Vous ne pouvez pas ouvrir 2 tickets en même temps", Client)],
                    ephemeral: true
                })
            }
        }
    }

    getDefaultBtnForTicket(Client, ticket_name) {
        const buttonManager = require("./buttonManager");
        let m = new buttonManager(Client);
        return {
            embeds: [
                embedManager.getDefaultParamForEmbed("Pour créer un ticket, réagissez avec la réaction", Client, ticket_name)
            ],
            components: [
                m.addButton("Create Ticket", buttonManager.GREY, ("ticket_" + ticket_name).toLowerCase(),this.getcallableForBtnTicket(ticket_name), false, null, "📩").getActionRow()
            ]
        }
    }
}

module.exports = new buttonFactory();