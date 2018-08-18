import {
    CategoryChannel, Client, Collection, Message, TextChannel, VoiceChannel
} from 'discord.js';
import {
    IChannelCategoryData,
    IChannelTextDataSave,
    IChannelVoiceDataSave,
    IRoleDataSave
} from '../declarations';
import addSetup from '../util/Database/QueriesScript/addSetup';

export default async function add(bot: Client, msg: Message, args: string[]) {

    if (msg.author.id !== bot.config.owner) {
        return msg.channel.send('<:setupError:480026869157068800>You have no permission to use this command.');
    }

    const [name] = args;
    if (!name) return msg.channel.send('<:setupError:480026869157068800>You need to specify a setup name.');

    const roles = msg.guild.roles;
    const channelsText =
              msg.guild.channels.filter((channel) => channel.type === 'text') as Collection<string, TextChannel>;
    const channelsVoice =
              msg.guild.channels.filter((channel) => channel.type === 'voice') as Collection<string, VoiceChannel>;
    const channelsCategory = msg.guild.channels
              .filter((channel) => channel.type === 'category') as Collection<string, CategoryChannel>;

    const roleData: IRoleDataSave[] = [];
    roles.forEach((role) => {
        if (role.name !== bot.user.username) {
            roleData.push({
                name: role.name,
                mentionable: role.mentionable,
                position: role.position,
                color: role.color,
                hoist: role.hoist,
                permissions: role.permissions,
                roleID: role.id
            });
        }
    });

    const channelTextData: IChannelTextDataSave[] = [];
    channelsText.forEach((channel) => {
        channelTextData.push({
            name: channel.name,
            position: channel.position,
            nsfw: channel.nsfw,
            parent: channel.parent.name,
            topic: channel.topic,
            permissions: channel.permissionOverwrites.map((x) => {
                return {allow: x.allowed.bitfield, deny: x.denied.bitfield, id: x.id};
            }),
            id: channel.id
        });
    });

    const channelVoiceData: IChannelVoiceDataSave[] = [];
    channelsVoice.forEach((channel) => {
        channelVoiceData.push({
            name: channel.name,
            parent: channel.parent.name,
            id: channel.id,
            userLimit: channel.userLimit,
            position: channel.position,
            permissions: channel.permissionOverwrites.map((x) => {
                return {allow: x.allowed.bitfield, deny: x.denied.bitfield, id: x.id};
            })
        });
    });

    const channelCategoryData: IChannelCategoryData[] = [];
    channelsCategory.forEach((channel) => {
        channelCategoryData.push({
            name: channel.name,
            id: channel.id,
            position: channel.position,
            permissions:  channel.permissionOverwrites.map((x) => {
                return {allow: x.allowed.bitfield, deny: x.denied.bitfield, id: x.id};
            })
        });
    });

    await addSetup(name,
        'Unknown',
        roleData,
        channelTextData,
        channelVoiceData,
        channelCategoryData,
        roleData.length + channelTextData.length + channelVoiceData.length + channelCategoryData.length);
    msg.channel.send(`Successfully created Setup \`${name}\`.`).catch(bot.log.error);

}
