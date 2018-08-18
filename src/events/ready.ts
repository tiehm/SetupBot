import { Client } from 'discord.js';

let readyState: boolean = false;

export default function(bot: Client): void {

    if (!readyState) {
        bot.log.info('The Bot is ready. It is used in %a servers with a total of %a users.',
            bot.guilds.size, bot.users.filter((u) => !u.bot).size);
        readyState = true;
    } else {
        bot.log.info('The Bot entered the ready state again. The initial ready event was handled before.');
    }

}
