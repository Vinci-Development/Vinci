const Event = require('../../Structures/Event');
const canvacord = require('canvacord');
const { MessageAttachment } = require('discord.js');
const gc = require('../../database/Mongodb/models/guilds');

module.exports = class extends Event {
    constructor(...args) {
        super(...args)
    };
    async run(member) {
        const guild = this.client.guilds.cache.get('797204659730907287');
        const channel = guild.channels.cache.find(c => c.name === 'welcome');
        const counter = guild.memberCount.toLocaleString();
        const role = guild.roles.cache.find(r => r.name === 'Member');

        if(!role) {
            const createdRole = guild.roles.create({ data: Member, reason: 'role couldn\'t find the role, so I created one for you'})
            member.roles.add(createdRole);
        } else {
            member.roles.add(role);
        }

        const welcome = new canvacord.Welcomer()
            .setAvatar(member.user.displayAvatarURL({ dynamic: false, format: 'png' }))
            .setUsername(member.user.username)
            .setGuildName(guild.name)
            .setMemberCount(counter)
            .setDiscriminator(member.user.discriminator);
            
        welcome.build()
            .then(data => {
                const attachment = new MessageAttachment(data, "welcome.png");
                channel.send(attachment);
            });

/*
        const user = new gc({
            memberCount: guild.memberCount
        });

        user.updateOne({ name: 'memberCount'}, function(res, err) {
            if(err) {
                console.log("Failed to update database... " + err)
            } else {
                console.log(`${res}`)
            }
        })
        */
    }
}
