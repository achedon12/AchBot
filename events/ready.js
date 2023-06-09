const slashsCommands = require("../managers/slashsCommandsManager");
const roleManager = require("../managers/roleManager");
const buttonFactory = require("../managers/buttonFactory")
const Main = require("../index");


module.exports.execute = async function (args1, args2, args3, Client) {
    setTimeout(function () {
        slashsCommands.PushCommandInDiscord(Client);
        slashsCommands.PushCommandNotArgument(Client);
    }, 1000);

    Client.user.setActivity({
        name: "Achedon - Community",
        type: 3,
        url: "https://discord.gg/RBhZtakZKy"
    });

    await roleManager.initialise_stateur(Client)

    let channel = Client.channels.cache.get(Main.channel_id.ticket);
    await channel.send(buttonFactory.getDefaultBtnForTicket(Client, "ticket"));

    console.log("bot allumé");
}
