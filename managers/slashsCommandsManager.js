let index = require("../index");
let Collection = index.commands;
const {Guild, Channel, GuildMember, Client, Interaction} = require("discord.js");

class slashsCommandsManager {

    equal = {
        "SUB_COMMAND": 1,
        "SUB_COMMAND_GROUP": 2,
        "STRING": 3,
        "INTEGER":4,
        "BOOLEAN":5,
        "USER":6,
        "CHANNEL":7,
        "ROLE":8,
        "MENTIONABLE":9,
        "NUMBER":10,
        "ATTACHMENT":11,
    }
    transformstrtoint(Client,network,start){
        if(!network.hasOwnProperty("options")) return network;
        network.options.forEach(option => {
            network.options[start].type = this.equal[option.type]
            start++;
            this.transformstrtoint(Client,option,0)
        })
        return network;
    }

    PushCommandInDiscord(Client) {
        Collection.forEach(cmd => {
            Client.application.commands.create(this.transformstrtoint(Client,cmd.network,0), ["965474854088343582"])
        })
    }

    PushCommandNotArgument(Client) {
        Collection.forEach(cmd => {
            if (cmd.config.pushable) {
                Client.application.commands.create({
                    name: cmd.network.name,
                    type: 2
                }, ["965474854088343582"])
            }
        })
    }

    /**
     *
     * @param {GuildMember} member
     * @param {Channel} channel
     * @param {Guild} guild
     * @param {Array} args
     * @param {String} commandName
     * @param {Client} Client
     * @param {Interaction} interaction
     * @returns {Promise<void>}
     * @constructor
     */
    async executeCommand(member, channel, guild, args, commandName, Client, interaction) {
        if (Collection.get(commandName) !== undefined) {
            Collection.get(commandName).execute(member, channel, guild, args, Client, interaction);
        } else {
            Interaction.reply("La commande n'existe pas !");
        }
    }

}

module.exports = new slashsCommandsManager();