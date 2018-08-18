import { ChannelCreationOverwrites, Guild, TextChannel } from 'discord.js';
import { IChannelVoiceDataSave, IRoleDataSave } from '../../../declarations';

function sleep(timeout: number): Promise<void> {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, timeout);
    });
}

export default function SetupVoiceChannels(
    guild: Guild, channels: IChannelVoiceDataSave[], roles: IRoleDataSave[], timeout: number): Promise<boolean> {

    return new Promise<boolean>(async (resolve, reject) => {

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

            await guild.createChannel(channel.name, 'voice', permissions).catch(reject);

            await sleep(timeout);
        }

        for (const channel of channels) {

            const channelFound =
                      guild.channels.find((c) => c.name === channel.name && c.type === 'voice') as TextChannel;
            if (channel.parent) {
                const parent = guild.channels.find((c) => c.name === channel.parent && c.type === 'category');
                await channelFound.setParent(parent.id).catch(reject);
                await sleep(timeout);
            }
            await channelFound.setPosition(channel.position).catch(reject);

            await sleep(timeout);
        }

        resolve(true);

    });

}
