const {
    urlencoded
} = require('body-parser');
const Event = require('../../Structures/Event');

module.exports = class messageReactionAdd extends Event {
    constructor(...args) {
        super(...args, {
            once: false
        })
    }
    async run(reaction, user) {
               
    }
}