import { ChannelCreationOverwrites, Guild, TextChannel } from 'discord.js';
import { IChannelTextDataSave, IRoleDataSave } from '../../../declarations';

function sleep(timeout: number): Promise<void> {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, timeout);
    });
}

export default function SetupTextChannels(
    guild: Guild, channels: IChannelTextDataSave[], roles: IRoleDataSave[], timeout: number): Promise<boolean> {

    return new Promise<boolean>(async (resolve, reject) => {

        await guild.createChannel('SetupBot by Charlie#3476', 'text');

        for (const channel of channels) {

            const permissions: ChannelCreationOverwrites[] = [];

            for (const perm of channel.permissions) {
                permissions.push({
                    id: guild.roles.find((role) => role.name ===
                        roles.find((roleData) => roleData.roleID === perm.id).name).id,
                    denied: perm.deny,
                    allowed: perm.allow
                });
            }

            await guild.createChannel(channel.name, 'text', permissions).catch(reject);

            await sleep(timeout);
        }

        for (const channel of channels) {

            const channelFound =
                      guild.channels.find((c) => c.name === channel.name && c.type === 'text') as TextChannel;
            if (channel.parent) {
                const parent = guild.channels.find((c) => c.name === channel.parent && c.type === 'category');
                await channelFound.setParent(parent.id).catch(reject);
                await sleep(timeout);
            }
            if (channel.nsfw) {
                await channelFound.setNSFW(true, 'Setting channel nsfw.').catch(reject);
                await sleep(timeout);
            }
            await channelFound.setPosition(channel.position).catch(reject);

            await sleep(timeout);
        }

        resolve(true);

    });

}
