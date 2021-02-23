const Event = require('../../Structures/Event');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const gc = require('../../database/Mysql/Models/Guilds');

const flags = {
	DISCORD_EMPLOYEE: 'Discord Employee',
	DISCORD_PARTNER: 'Discord Partner',
	BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
	BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
	HYPESQUAD_EVENTS: 'HypeSquad Events',
	HOUSE_BRAVERY: 'House of Bravery',
	HOUSE_BRILLIANCE: 'House of Brilliance',
	HOUSE_BALANCE: 'House of Balance',
	EARLY_SUPPORTER: 'Early Supporter',
	TEAM_USER: 'Team User',
	SYSTEM: 'System',
	VERIFIED_BOT: 'Verified Bot',
	VERIFIED_DEVELOPER: 'Verified Bot Developer'
};


module.exports = class guildMemberAdd extends Event {
    constructor(...args) {
        super(...args)
    };
    async run(member) {
        const userFlags = member.user.flags.toArray();
        const guild = this.client.guilds.cache.get('797204659730907287');
        const channel = guild.channels.cache.find(c => c.name === 'welcome');
        const counter = guild.memberCount.toLocaleString();
        const role = guild.roles.cache.find(r => r.name === 'Member');

        if(!role) {
            console.log(`${role} does\t exist creating one for you...`)
            guild.roles.create({ data: 'Member', reason: 'Created the role' }).then(res => res.roles.add(role));
        } else {
            member.roles.add(role);
        }


        const guildConfig = await gc.findOne({ where: { guildId: guild.id }});

        if(guildConfig) {
            guildConfig.memberSize = counter
            await guildConfig.save();
        }

        const embed = new MessageEmbed()
			.setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
			.setColor('BLUE')
			.addField('User', [
				`**❯ Username:** ${member.user.username}`,
				`**❯ Discriminator:** ${member.user.discriminator}`,
				`**❯ ID:** ${member.id}`,
				`**❯ Flags:** ${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}`,
				`**❯ Avatar:** [Link to avatar](${member.user.displayAvatarURL({ dynamic: true })})`,
				`**❯ Time Created:** ${moment(member.user.createdTimestamp).format('LT')} ${moment(member.user.createdTimestamp).format('LL')} ${moment(member.user.createdTimestamp).fromNow()}`,
				`**❯ Status:** ${member.user.presence.status}`,
				`**❯ Member #:** ${counter}`,
				`\u200b`
			])
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        return await channel.send(embed);
    }
}
