const Command = require('../../Structures/Command');
const axoios = require('axios').default;

module.exports = class scrap extends Command {
    constructor(...args) {
        super(...args, {
            name: "scrap",
            ownerOnly: true
        })
    }

    async run(message) {
        axoios.get('https://www.cuteondiscord.com/videos.html').then(res => console.log(res));
    }
}