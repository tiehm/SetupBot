import { Client, Message } from 'discord.js';

export default async function ping(bot: Client, msg: Message, args: string[]) {

    const msgSent = await msg.channel.send('Pinging...') as Message;
    await msgSent.edit(`Pong! Took ${msgSent.createdTimestamp - msg.createdTimestamp}ms`);

}
