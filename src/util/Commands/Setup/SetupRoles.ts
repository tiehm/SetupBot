import { Guild } from 'discord.js';
import { IRoleDataSave } from '../../../declarations';

function sleep(timeout: number): Promise<void> {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, timeout);
    });
}

export default function SetupRoles(
    guild: Guild, roles: IRoleDataSave[], timeout: number): Promise<boolean> {

    return new Promise<boolean>(async (resolve, reject) => {

        for (const role of roles.sort((a, b) => b.position - a.position)) {

            if (role.name === '@everyone') {
                const everyone = guild.defaultRole;
                await everyone.setColor(role.color).catch(reject);
                await sleep(timeout);
                await everyone.setMentionable(role.mentionable).catch(reject);
                await sleep(timeout);
                await everyone.setPermissions(role.permissions).catch(reject);
            } else {
                await guild.createRole({
                    name: role.name,
                    mentionable: role.mentionable,
                    color: role.color,
                    permissions: role.permissions,
                    hoist: role.hoist,
                }).catch(reject);
            }

            await sleep(timeout * 2);
        }

        resolve(true);

    });

}
