![alt text](https://i.imgur.com/Wu8Sqmx.png)

1. [ Description. ](#desc)
2. [ Command usage. ](#cmd)
3. [ Events. ](#events)
4. [ Contact information. ](#ci)
5. [ Future updates. ](#updates)


<a name="desc"></a>
## Description
Yeah idk what to put here lol but please lmk if you do!

<a name="cmd"></a>
## Commands Usage

You need to do this:

```javascript
const Command = require('../../Structures/Command');

module.exports = class cmdName extends Command {
    constructor(...args) {
        super(...args, {
            name: "cmd name",
            description: "description",
            userPerms: ["permission_node here"],
            category: "category name here",
            aliases: [""],
            usage: ""
        })
    }

    async run(message, args) {
        //code here
    }
}
```

**Commands handler**
```js
const { Permissions } = require('discord.js');

module.exports = class Command {

	constructor(client, name, options = {}) {
		this.client = client;
		this.name = options.name || name;
		this.aliases = options.aliases || [];
		this.description = options.description || 'No description provided.';
		this.category = options.category || 'General';
		this.usage = `${this.client.prefix}${this.name} ${options.usage || ''}`.trim();
		this.userPerms = new Permissions(options.userPerms).freeze();
		this.botPerms = new Permissions(options.botPerms).freeze();
		this.guildOnly = options.guildOnly || false;
		this.ownerOnly = options.ownerOnly || false;
		this.nsfw = options.nsfw || false;
		this.args = options.args || false;
	}

	async run(message, args) {
		throw new Error(`Command ${this.name} doesn't provide a run method!`);
	}
};
```


<a name="events"></a>
## Events
**Read event example**

```js

const Event = require('../Structures/Event');
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
    }
};
```

**Event handler**
```js
module.exports = class Event {

	constructor(client, name, options = {}) {
		this.name = name;
		this.client = client;
		this.type = options.once ? 'once' : 'on';
		this.emitter = (typeof options.emitter === 'string' ? this.client[options.emitter] : options.emitter) || this.client;
	}


	async run(...args) {
		throw new Error(`The run method has not been implemented in ${this.name}`);
	}

};
```

**If you want to use custom events you'll need to use the client.emit function:**


<a name="ci"></a>
## Contact Information

<li>Author(s): Nemijah#6392, Puppet#1686, Dimitri#1579 and Rhydderchc#4204<li>


<a name="updates"></a>
## Future updates

<li>Dashboad + custom apis</li>