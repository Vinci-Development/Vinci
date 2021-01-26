const Event = require('../../Structures/Event');
const memberConfig = require('../../database/models/memberConfig');
const Canvas = require('discord-canvas');
const { MessageAttachment } = require('discord.js');
module.exports = class guildMemberAdd extends Event {
    constructor(...args) {
        super(...args)
        this.client.on("guildMemberAdd", async member => {
            console.log(member)
            const cs = new Canvas.Welcome
            const channel = this.client.channels.cache.find(c => c.name === 'welcome');
            let image = await cs
                .setUsername(member.user.username)
                .setDiscriminator(member.user.discriminator)
                .setMemberCount("COming soon")
                .setGuildName("Coming soon")
                .setAvatar(`${member.user.displayAvatarURL({ dynamic: true })}`)
                .setColor("border", "#8015EA")
                .setColor("username-box", "#8015EA")
                .setColor("discriminator-box", "#8015EA")
                .setColor("message-box", "#8015EA")
                .setColor("title", "#8015EA")
                .setColor("avatar", "#8015EA")
                .setBackground('https://i.imgur.com/jwSU08a.jpg')
                .toAttachment();
            let attachment = new MessageAttachment(image.toBuffer(), "hi");
            channel.send(attachment);
            let Data = {
                Username: member.user.username,
                UserID: member.user.id,
                userTag: member.user.discriminator,
                JoinDate: member.joinedTimestamp,
                isBanned: false
            }
        })
    }
    async run() {
        return
    }
}