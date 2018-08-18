import { Client, Message } from 'discord.js';

export default function(bot: Client, msg: Message) {

    if (msg.author.bot || !msg.guild || !msg.content.startsWith(bot.config.prefix) || !msg.content) return;

    const args: string[] = msg.content.slice(bot.config.prefix.length).trim().split(/ +/g);
    const command: string = args.shift().toLowerCase();

    if (!bot.cmds.get(command)) {
        return msg.channel.send(`I am sorry ${msg.author}, \`${command}\` is not a registered command.`);
    }

    bot.cmds.get(command)(bot, msg, args);

}
