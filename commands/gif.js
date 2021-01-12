const fetch = require('node-fetch');

module.exports = {
    name: 'gif',
    description: 'GIFs from Giphy. Pronounced GIF, not GIF.',
    async execute(msg, args) {
        let keywords;
        if (args.length > 0) {
            keywords = args.join("+");
        } else {
            keywords = "cat";
        }
        let url = `https://api.giphy.com/v1/gifs/search?q=${keywords}&rating=g&api_key=${process.env.GIPHY_API_KEY}`;
        let res = await fetch(url);
        let json = await res.json();
        const index = Math.floor(Math.random() * json.data.length);
        let result = json.data[index] ? json.data[index].url : "No gif was found with your search parameters.";
        let sent = msg.channel.send(result);
        (await sent).react('⬆');
        (await sent).react('⬇');
    },
};
