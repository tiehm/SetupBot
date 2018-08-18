import { Client } from 'discord.js';
import { readdir } from 'fs';

export function CommandReader(bot: Client): void {
    readdir(`${process.cwd()}/dist/commands/`, (err, files) => {
        if (err) throw err;
        for (const file of files) {
            const [name] = file.split('.');
            const exec = require(`../../commands/${file}`).default;

            bot.cmds.set(name, exec);
        }
    });
}
