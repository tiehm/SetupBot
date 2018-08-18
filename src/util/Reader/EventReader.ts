import { Client } from 'discord.js';
import { readdir } from 'fs';

export function EventReader(bot: Client): void {
    readdir(`${process.cwd()}/dist/events/`, (err, files) => {
        if (err) throw err;
        for (const file of files) {
            const [name] = file.split('.');
            const run = require(`../../events/${file}`).default;
            bot.on(name, (...args) => { run(bot, ...args); });
        }
    });
}
