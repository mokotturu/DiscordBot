const Note = require('../models/Note');

module.exports = {
    name: 'notes',
    description: 'Create a note',
    async execute(msg, args) {
        if (args.length == 0) {
            msg.reply("use:\n - !notes show\n - !notes add <content>\n - !notes rm <id>");
            return;
        } else if (args[0] == "add") {
            args.shift();
            let noteContent = args.join(" ");
            try {
                let note = new Note({
                    note: noteContent,
                    author: msg.author.id
                });
                await note.save();
                let reply = `note saved: "${note.note}"\n\nRemaining notes:\n`;
                let foundNotes = await Note.find({ author: msg.author.id });
                foundNotes.forEach((val, i) => {
                    reply += `${i + 1}: (ID: ${val._id}) - ${val.note}\n`;
                });
                msg.reply(reply);
            } catch (err) {
                console.log(err);
                msg.reply("sorry, could not save the note.");
            }
        } else if (args[0] == "show") {
            let foundNotes = await Note.find({ author: msg.author.id });
            let reply;
            if (foundNotes.length == 0) {
                reply = "no notes found.";
            } else {
                reply = "\n";
                foundNotes.forEach((val, i) => {
                    reply += `${i + 1}: (ID: ${val._id}) - ${val.note}\n`;
                });
            }
            msg.reply(reply);
        } else if (args[0] == "rm") {
            args.shift();
            let id = args.join();
            Note.findOneAndDelete({ _id: id, author: msg.author.id }, async (err, doc) => {
                if (err || doc == null) {
                    console.log(err);
                    msg.reply("sorry, couldn't find the note. Please check your ID.");
                } else {
                    let reply = `note deleted: "${doc.note}"\n\nRemaining notes:\n`;
                    let foundNotes = await Note.find({ author: msg.author.id});
                    foundNotes.forEach((val, i) => {
                        reply += `${i + 1}: (ID: ${val._id}) - ${val.note}\n`;
                    });
                    msg.reply(reply);
                }
            });
        } else {
            msg.reply("sorry, argument not found. Use:\n - !notes show\n - !notes add <content>\n - !notes rm <id>")
        }
    }
}
