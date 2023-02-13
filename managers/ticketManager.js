const {Guild, TextChannel} = require("discord.js");
const embedManager = require("./embedManager");
const Main = require("../index");
const {PermissionFlagsBits,ChannelType} = require("discord.js");
const buttonManager = require("./buttonManager");

class ticketManager {
    async createTicket(Executor, Client, ticket_name = "Help", roles = [{
        "role_id": Main.role_id.moderatorID,
        "roles": {
            SendMessages: true,
            ViewChannel: true,
            ReadMessageHistory: true,
            ManageMessages: true
        }
    }]) {
        const buttonManager = require("./buttonManager");
        let guild = await Executor.guild;
        if (guild instanceof Guild) {
            let ticket = await guild.channels.create({
                name: `ticket-${Executor.user.username}`,
                type: ChannelType.GuildText,
                parent: Main.channel_id.category_ticket,
                permissionOverwrites: [
                    {
                        id: await guild.roles.fetch(guild.id),
                        deny: [
                            PermissionFlagsBits.SendMessages,
                            PermissionFlagsBits.ViewChannel
                        ]
                    }
                ]
            });
            if (ticket instanceof TextChannel) {
                for (const data of roles) {
                    await ticket.permissionOverwrites.create(await guild.roles.fetch(data["role_id"]), data["roles"]);
                }
                await ticket.permissionOverwrites.create(Executor.user, {
                    SendMessages: true,
                    ViewChannel: true,
                    ReadMessageHistory: true
                });
                ticket.send({
                    embeds: [
                        embedManager.getDefaultParamForEmbed(`Bienvenue <@!${Executor.id}>, veuillez poser votre question et attendre une réponse`, Client, "Ticket - " + ticket_name)
                    ],
                    components: [
                        new buttonManager(Client).addButton("Fermer le ticket", buttonManager.RED, "close").getActionRow()
                    ]
                })
                return ticket.id;
            }
        }
    }

    async closeTicket(Executor, channel, Client) {
        const buttonManager = require("./buttonManager");
        if (channel instanceof TextChannel) {
            if (channel.parentId === Main.channel_id.category_ticket) {
                await channel.permissionOverwrites.edit(Executor.user, {
                    SendMessages: false,
                    ViewChannel: false,
                    ReadMessageHistory: false
                });
                await channel.setName("Close-" + channel.name.split("ticket-")[1])
                await channel.setTopic(Executor.id)
                channel.send({
                    embeds: [
                        embedManager.getDefaultParamForEmbed("ticket fermé", Client, "Achedon12 - Communauté Ticket")
                    ],
                    components: [
                        new buttonManager(Client)
                            .addButton("Supprimer", buttonManager.RED, "delete")
                            .getActionRow()
                    ]
                })
            }
        }
    }

    async reopenTicket(Executor, channel, Client) {
        const buttonManager = require("./buttonManager");
        if (channel instanceof TextChannel) {
            if (channel.parentId === Main.channel_id.category_ticket) {
                await channel.permissionOverwrites.edit(Executor.user, {
                    SendMessages: true,
                    ViewChannel: true,
                    ReadMessageHistory: true
                });
                await channel.setName("Ticket-" + channel.name.split("ticket-")[1])
                await channel.setTopic(Executor.id)
                channel.send({
                    embeds: [
                        embedManager.getDefaultParamForEmbed("ticket ré-ouvert", Client, "Achedon12 - Communauté Ticket")
                    ]
                })
            }
        }
    }

    async renameTicket(channel) {
        if (channel instanceof TextChannel) {
            if (channel.parentId === Main.channel_id.ticket) {
                await channel.setName(`closed-ticket`);
            }
        }
    }

    async hasTicket(Executor) {
        let channel = await Executor.guild.channels.cache.find(c => c.name === `ticket-${Executor.user.username}` && c.parentId === Main.channel_id.category_ticket);
        return channel instanceof TextChannel;
    }

    isOwnerTicket(channel, Executor) {
        return Executor.roles.cache.find(r => r.id === Main.role_id.moderatorID) !== undefined || channel.name.split("-")[1] === Executor.user.username
    }

    isInTicket(channel) {
        return channel.parentId === Main.channel_id.category_ticket;
    }
}

module.exports = new ticketManager();