const Event = require('../Structures/Event');
const db = require('../database/mongodb');
const { nodes } = require('../../config.json');
const { Manager } = require("erela.js");
const { MessageEmbed } = require('discord.js');


const { GiveawaysManager } = require('discord-giveaways');

module.exports = class extends Event {

	constructor(...args) {
		super(...args, {
			once: true
		});
	}

	async run() {
		
		console.log([
			`Logged in as ${this.client.user.tag}`,
			`Loaded ${this.client.commands.size} commands!`,
			`Loaded ${this.client.events.size} events!`
		].join('\n'));



		this.client.manager = new Manager({
			nodes,
			send: (id, payload) => {
				const guild = this.client.guilds.cache.get('801877337401458688');
				if (guild) guild.shard.send(payload);
			}
		});


		this.client.manager.on("nodeConnect", node => {
			console.log(`Node "${node.options.identifier}" connected.`)
		})

		this.client.manager.on("nodeError", (node, error) => {
			console.log(`Node "${node.options.identifier}" encountered an error: ${error.message}.`)
		})


		this.client.on("raw", d => this.client.manager.updateVoiceState(d));

		
		this.client.manager.init(this.client.user.id);


		this.client.manager.on("trackStart", (player, track) => {
			const channel = this.client.channels.cache.get(player.textChannel);
			const duration = ((track.duration / 60000).toFixed(2).replace('.', ':'));
			channel.send(
				new MessageEmbed()
				.addFields({
					name: "Now playing:",
					value: track.title,
					inline: true
				}, {
					name: "Duration:",
					value: duration,
					inline: true
				}, {
					name: "requested by:",
					value: track.requester.tag,
					inline: true
				})
				.setTimestamp()
				.setTitle("Finding a new song....")
				.setThumbnail(track.requester.displayAvatarURL({
					dynamic: true,
					size: 512
				}))
			);
		});


		this.client.manager.on("queueEnd", player => {
			const channel = this.client.channels.cache.get(player.textChannel);
			channel.send("Queue has ended.");
			setTimeout(() => {
				message.reply("Queue hass ended leaving voice channel in 2 minutes...")
				player.destroy();
			}, 120000)
		});
	}
};
