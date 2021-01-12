const dotenv = require('dotenv');
dotenv.config({ path: 'config.env' });
const fs = require('fs');

const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.login(process.env.BOT_TOKEN);

client.once('ready', () => {
    console.log('Bot logged in');
    client.user.setActivity('asleep', { type: 'PLAYING'});
});

client.on('message', async msg => {
    if (!msg.content.startsWith(process.env.PREFIX) || msg.author.bot) return;

    const args = msg.content.slice(process.env.PREFIX.length).trim().split(" ");
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) {
        msg.react('❓');
        return;
    }

    try {
        client.commands.get(command).execute(msg, args);
        console.log(msg, args);
    } catch (err) {
        console.log(err);
        msg.reply('There was an error trying to execute that command.');
    }
});
