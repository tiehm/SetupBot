import { ChannelCreationOverwrites, Guild } from 'discord.js';
import { IChannelCategoryData, IRoleDataSave } from '../../../declarations';

function sleep(timeout: number): Promise<void> {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, timeout);
    });
}

export default function SetupCategories(
    guild: Guild, categories: IChannelCategoryData[], roles: IRoleDataSave[], timeout: number): Promise<boolean> {

    return new Promise<boolean>(async (resolve, reject) => {

        for (const category of categories) {

            const permissions: ChannelCreationOverwrites[] = [];

            for (const perm of category.permissions) {
                permissions.push({
                    id: guild.roles.find((role) => role.name ===
                        roles.find((roleData) => roleData.roleID === perm.id).name).id,
                    denied: perm.deny,
                    allowed: perm.allow
                });
            }

            await guild.createChannel(category.name, 'category', permissions).catch(reject);

            await sleep(timeout);
        }

        for (const category of categories) {

            const channel = guild.channels.find((c) => c.name === category.name);
            await channel.setPosition(category.position).catch(reject);

            await sleep(timeout);
        }

        resolve(true);

    });

}
