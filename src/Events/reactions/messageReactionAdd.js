const Event = require('../../Structures/Event');

module.exports = class messageReactionAdd extends Event {
    constructor(...args) {
        super(...args, {
            once: true
        })
    }
    async run(reaction, user) {
        console.log(user.user.tag + " reacted with " + reaction.emoji.name) 
    }
}