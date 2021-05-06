const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const connectDB = require('./config/db.js');
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });
const app = express();

connectDB();

app.use(bodyParser.urlencoded({ extended: true, limit: '50MB', parameterLimit: 1000000000000000}));
app.use(bodyParser.json({ extended: true, limit: '50MB' }));

const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

console.log(process.env.MONGO_URI)

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.login(process.env.BOT_TOKEN);

client.once('ready', () => {
	console.log('Bot logged in');
	client.user.setActivity('never gonna give you up', { type: 'PLAYING' });
});

client.on('message', async msg => {
	if (!msg.content.startsWith(process.env.PREFIX) || msg.author.bot) return;

	const args = msg.content.slice(process.env.PREFIX.length).trim().split(" ");
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) {
		msg.react('❓');
		return;
	}

	msg.channel.startTyping();

	try {
		client.commands.get(command).execute(msg, args);
	} catch (err) {
		console.log(err);
		msg.reply('There was an error trying to execute that command.');
	}
	
	msg.channel.stopTyping();
});
