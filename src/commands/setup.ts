import { Client, Message } from 'discord.js';
import * as ms from 'ms';
import { ISQLSetup } from '../declarations';
import SetupCategories from '../util/Commands/Setup/SetupCategories';
import SetupRoles from '../util/Commands/Setup/SetupRoles';
import SetupTextChannels from '../util/Commands/Setup/SetupTextChannels';
import SetupVoiceChannels from '../util/Commands/Setup/SetupVoiceChannels';
import getSetup from '../util/Database/QueriesScript/getSetup';

function sleep(timeout: number): Promise<void> {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, timeout);
    });
}

export default async function setup(bot: Client, msg: Message, args: string[]) {

    const [name] = args;
    if (!name) return msg.channel.send('<:setupError:480026869157068800>Please provide a setup name.');

    const setupData = await getSetup(name).catch((err) => {
        // tslint:disable-next-line:no-console
        console.error(err);
        // tslint:disable-next-line:no-console
        msg.channel.send('<:setupError:480026869157068800>An unknown Error occurred.').catch(console.error);
    }) as ISQLSetup;

    // tslint:disable-next-line:max-line-length
    await msg.channel.send(`<:setupWarn:480026837276295169>Do **not** create, edit or delete anything on this Discord until the Setup process is finished. You chose the \`${name}\` template with a total of \`${setupData.totalItems}\` channels and roles. This Setup will take at least \`${ms(setupData.totalItems * 3 * bot.config.timeoutBetweenActions, {long: true})}\`.`);

    await SetupRoles(msg.guild, setupData.roles, bot.config.timeoutBetweenActions);
    await SetupCategories(msg.guild, setupData.channelCategory, setupData.roles, bot.config.timeoutBetweenActions);
    if (setupData.totalItems > 25) await sleep(10000);
    await SetupTextChannels(msg.guild, setupData.channelText, setupData.roles, bot.config.timeoutBetweenActions);
    if (setupData.totalItems > 25) await sleep(10000);
    await SetupVoiceChannels(msg.guild, setupData.channelVoice, setupData.roles, bot.config.timeoutBetweenActions);

    // tslint:disable-next-line
    await msg.channel.send(`<:setupSuccess:480026937884934154>Successfully created Setup. For updates or suggestion, join the official discord server ${bot.config.officialDiscord}`);
}
