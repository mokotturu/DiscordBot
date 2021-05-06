const fetch = require('node-fetch');

module.exports = {
	name: 'hungry',
	description: 'Feel more hungry, maybe.',
	async execute(msg, args) {
		let url = `https://foodish-api.herokuapp.com/api`;
		let res = await fetch(url);
		let json = await res.json();
		let sent = msg.channel.send(json.image);
		(await sent).react('⬆');
		(await sent).react('⬇');
	},
};
