const fetch = require('node-fetch');

module.exports = {
    name: 'bored',
    description: 'Increase your boredom.',
    async execute(msg, args) {
        let url = `https://boredapi.com/api/activity`;
        let res = await fetch(url);
        let json = await res.json();
        let sent = msg.channel.send(`${json.activity}!`);
        (await sent).react('⬆');
        (await sent).react('⬇');
    },
};
