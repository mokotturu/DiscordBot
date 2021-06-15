// CLOSED to avoid billing

/* const fetch = require('node-fetch');
const deepai = require('deepai');
const e = require('express');
const Filter = require('bad-words');
const customFilter = new Filter({ placeHolder: '\r' });
deepai.setApiKey(process.env.DEEPAI_API_KEY);

module.exports = {
	name: 'enlighten',
	description: 'Comedy heaven in text generation.',
	async execute(msg, args) {
		if (args.length == 0) {
			msg.reply("please enter some text after the command.");
			return;
		}
		let corpus = args.join(" ");
		let res = await deepai.callStandardApi("text-generator", {
			text: corpus
		});

		console.log(res.output.slice(0, res.output.indexOf('\n', 50)));
		msg.reply(customFilter.clean(res.output.slice(0, res.output.indexOf('\n', 50))));
	}
};
 */