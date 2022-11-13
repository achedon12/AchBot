const {CommandInteraction} = require("discord.js");
const slashsCommandsManager = require("../managers/slashsCommandsManager");

module.exports.execute = async function (interaction, any1, any2, Client) {
    /**
     * @param {CommandInteraction} interaction
     */
    if (interaction.isChatInputCommand() || interaction.isContextMenuCommand() || interaction.isMessageContextMenuCommand()) {
        let args = [];
        if(interaction.options._group !== null) args[args.length] = interaction.options._group
        if(interaction.options._subcommand !== null) args[args.length] = interaction.options._subcommand
        for (const data of interaction.options._hoistedOptions) {
            switch (data.type) {
                case "USER":
                    await Client.users.fetch(data.value).then(function (data) {
                        args[args.length] = data;
                    });
                    break;
                case "STRING":
                case "INTEGER":
                case "NUMBER":
                case "BOOLEAN":
                    args[args.length] = data.value;
                    break;
                case "CHANNEL":
                    await Client.channels.fetch(data.value).then(function (data) {
                        args[args.length] = data;
                    });
                    break;
                case "ROLE":
                    args[args.length] = interaction.guild.roles.cache.find(r => r.id === data.value);
                    break;
                default:
                    args[args.length] = data.value;
                    break;
            }
        }
        await slashsCommandsManager.executeCommand(interaction.member, interaction.channel, interaction.guild, args, interaction.commandName, Client, interaction)
    }
}