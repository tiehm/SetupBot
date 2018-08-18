/*
 MIT License

 Copyright (c) 2018 Charlie Tiehm

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */

import { Client, Collection, Message } from 'discord.js';
import config = require('../config');
import { Logger } from './util/Logger/Logger';
import { CommandReader } from './util/Reader/CommandReader';
import { EventReader } from './util/Reader/EventReader';

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
