# DiscordBot

A pretty useless Discord bot built using NodeJS.

Each command starts with a prefix `!`

Commands:
- `hi` - Greet the bot.
- `gif` - Search for a gif (gif, not gif) on giphy.com. the default command searches for cat gifs. Add any number of keywords following the command to search for those particular gifs.
- `hungry` - Get pictures of yummy dishes.
- `bored` - Get an activity that you probably would never do even if you're super bored because you're just lazy.
- `notes` - Show all the available flags for this command.
	- `add` - Add a new note to your personal notes list.
	- `show` - Shows all the notes you added to your personal list.
	- `rm` - Remove a particular note from your personal list. Pass in the UUID of the note to be removed after the `rm` flag. The UUIDs can be obtained using the show flag.
