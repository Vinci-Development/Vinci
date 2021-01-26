const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const {request} = require('superagent');

module.exports = class advice extends Command {

    constructor(...args) {
        super(...args, {
            aliases: [],
            description: 'Advices you!',
            category: 'Fun',
            guildOnly: true,
            nsfw: false,
            PERMISSIONS: ['KICK_MEMBERS']
        });
    }

    async run(message, args) {
    request
            .get('http://api.adviceslip.com/advice')
            .end((err, res) => {
                if (!err && res.status === 200) {
                    try {
                        JSON.parse(res.text)
                    } catch (e) {
                        return message.channel.send('An api error occurred.');
                    }
                    const advice = JSON.parse(res.text)
                    message.channel.send(advice.slip.advice)
                } else {
                console.error(`REST call failed: ${err}, status code: ${res.status}`)
                }
            });
    
    
    };
