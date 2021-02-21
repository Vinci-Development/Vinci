const TicketConfig = require('../../database/Mysql/Models/TicketConfig');
const Ticket = require('../../database/Mysql/Models/Ticket');

const Event = require('../../Structures/Event');
const { urlencoded } = require('body-parser');
const { use } = require('random');

module.exports = class messageReactionAdd extends Event {
    constructor(...args) {
        super(...args, {
            once: false
        })
    }
    async run(reaction, user) {
        if(reaction.emoji.name === '🎫') {
            const config = await TicketConfig.findOne({ where: { messageId: reaction.message.id }});
            if(config) {
                const findTicket = await Ticket.findOne({ where: { authorId: user.id, resolved: false }});
                if(findTicket) user.send('You already have an active ticket... Please resolve it first!');
                else {
                    console.log("Creating ticket");
                    user.send("Creating ticket...");
                    try {
                        
                    } catch(err) {
                        console.log(err)
                    }
                }
            }
        } else {
            console.log("No ticket configs found!");
        }
    }
}