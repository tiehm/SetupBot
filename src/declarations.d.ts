import { Client, Message } from 'discord.js';
import { Logger } from './util/Logger/Logger';

declare module 'discord.js' {
    // tslint:disable-next-line:interface-name
    export interface Client {
        cmds: Collection<string, (bot: Client, msg: Message, args: string[]) => void|boolean>;
        config: IConfig;
        log: Logger;
    }
}

interface IConfig {
    prefix: string;
    owner: string;
    timeoutBetweenActions: number;
    officialDiscord: string;
}

interface IRoleDataSave {
    name: string;
    mentionable: boolean;
    position: number;
    color: number;
    hoist: boolean;
    permissions: number;
    roleID: string;
}

interface IChannelTextDataSave {
    name: string;
    position: number;
    nsfw: boolean;
    parent: string;
    topic: string;
    permissions: Array<{allow: number, deny: number, id: string}>;
    id: string;
}

interface IChannelVoiceDataSave {
    name: string;
    parent: string;
    id: string;
    userLimit: number;
    position: number;
    permissions: Array<{allow: number, deny: number, id: string}>;
}

interface IChannelCategoryData {
    name: string;
    id: string;
    position: number;
    permissions: Array<{allow: number, deny: number, id: string}>;
}

interface ISQLSetup {
    name: string;
    roles: IRoleDataSave[];
    channelText: IChannelTextDataSave[];
    channelVoice: IChannelVoiceDataSave[];
    channelCategory: IChannelCategoryData[];
    totalItems: number;
}
