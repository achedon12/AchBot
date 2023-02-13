const {ActionRowBuilder, ButtonBuilder} = require("discord.js");

class buttonManager {

    constructor(Client) {
        this.Client = Client;
        this.Row = new ActionRowBuilder();
        this.Row.type = "ACTION_ROW"
    }

    addButton(label, color, id, func = null, disable = false, url = null, emoji = undefined, type = 2) {
        this.Row.addComponents(new ButtonBuilder({
            type: type,
            label: label,
            style: color,
            customId: id,
            emoji: emoji,
            url: url,
            disabled: disable
        }));
        const buttonFactory = require("./buttonFactory");
        buttonFactory.addCallable(id,func)
        return this;
    }

    getActionRow() {
        return this.Row;
    }
}

module.exports = buttonManager;

module.exports.GREEN = 3
module.exports.RED = 4
module.exports.BLEU = 1
module.exports.GREY_LINK = 5
module.exports.GREY = 2