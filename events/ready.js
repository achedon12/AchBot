module.exports.execute = async function (args1,args2,args3,Client) {
    console.log("bot allumé");
    Client.user.setActivity({
        name: "Achedon - Community",
        type: 3,
        url: "https://discord.gg/RBhZtakZKy"
    });
}
