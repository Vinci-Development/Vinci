const Event = require('../../Structures/Event');
const guildConfig = require('../../database/models/guildConfig');
const Discord = require('discord.js');
const config = require('../../../config.json');


module.exports = class guildCreate extends Event {
    constructor(...args) {
        super(...args)
        this.client.on("guildCreate", async guild => {
            let Data = {
                guildId: guild.id,
                guildName: guild.name,
                memberCount: guild.memberCount
            }
           await guildConfig.findOneAndUpdate({guildId: guild.id}, Data, {
               new: true,
               upsert: true,
               useFindAndModify: false
           })
        console.log("Guildcrea emitter fired")
        })
    }
    async run() {
        return;
    }
}