const Command = require('../../Structures/Command');
const { stripIndents } = require('common-tags');
const { Inspect, inspect } = require('util');
const { VultrexHaste } = require('vultrex.haste');
const haste = new VultrexHaste({ url: "https://haste.in "});

module.exports = class ass extends Command {
    constructor(...args) {
        super(...args, {
            aliases: [''],
            description: "evaluates javascript.",
            nsfw: false,
            ownerOnly: true
        })
    }
    async run(message, args) {
        if(!args[0]) return message.reply("You just provide JavaScript code to evaluate..");

        try {
            const start = process.hrtime();
            let output = eval(args.join(" "));
            const diff = process.hrtime(start);
            if(typeof output !== "string") output = inspect(output, { depth: 2});

            return message.channel.send(`
                *Executed in ${diff[0] > 0 ? `${diff[0]}s` :  ""}${diff[1] / 1e6}ms*
                \`\`\`js
                ${output.length > 1950 ? await haste.post(output) : output}
                \`\`\`
            
            `)
        } catch(err) {
            message.channel.send(stripIndents `
                Error:
                \`${err}\`
            `);
        }
    }
}