const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const {request} = require('superagent');

module.exports = class advice extends Command {

    constructor(...args) {
        super(...args, {
            aliases: [],
            description: 'Pats the mentioned user!',
            category: 'Fun',
            guildOnly: true,
            nsfw: false,
            PERMISSIONS: []
        });
    }

    async run(message, args) {
    
    if (!message.mentions.users.first()) return message.reply("You need to mention someone to pat them ");
    if (message.mentions.users.first().id === client.user.id) return message.channel.send('*Why me....?*');
    if (message.mentions.users.first().id === message.author.id) return message.channel.send('I understand, you\'ve got no one to pat');
    const { body } = await superagent
    .get("https://nekos.life/api/pat");
    
    const embed = new Discord.MessageEmbed()
    .setColor("#ff9900")
    .setTitle(` ${message.mentions.users.first().username}, got a pat from ${message.author.username}!`)
    .setImage(body.url) 
    message.channel.send({embed})
    
    
    
    };
