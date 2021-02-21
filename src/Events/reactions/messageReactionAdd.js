const Event = require('../../Structures/Event');

module.exports = class messageReactionAdd extends Event {
    constructor(...args) {
        super(...args, {
            once: false
        })
    }
    async run(reaction, user) {
        console.log(user.username + " reacted with " + reaction.emoji.name) 
    }
}