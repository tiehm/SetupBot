import { Client, Collection, Message } from 'discord.js';
import { Logger } from './util/Logger/Logger';
import { CommandReader } from './util/Reader/CommandReader';
import { EventReader } from './util/Reader/EventReader';
import config = require('../config');

const bot: Client = new Client();
bot.cmds = new Collection<string, (bot: Client, msg: Message, args: string[]) => void|boolean>();
bot.config = config;
bot.log = new Logger(process.stdout, false);

EventReader(bot);
CommandReader(bot);

bot.login(process.env.TOKEN).then(() => {
    bot.log.info('Successfully logged into the Discord API.');
}).catch((err) => {
    bot.log.error(err);
});

// tslint:disable-next-line:no-console
process.on('unhandledRejection', console.error);
// tslint:disable-next-line:no-console
process.on('uncaughtException', console.error);
