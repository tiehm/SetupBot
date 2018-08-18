import { readFileSync } from 'fs';
import {
    IChannelCategoryData,
    IChannelTextDataSave,
    IChannelVoiceDataSave,
    IRoleDataSave
} from '../../../declarations';
import { pool } from '../init';

export default function addSetup(
    name: string,
    time: string,
    roles: IRoleDataSave[],
    channelText: IChannelTextDataSave[],
    channelVoice: IChannelVoiceDataSave[],
    channelCategory: IChannelCategoryData[],
    totalItems: number): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) return reject(err);
            const sql = readFileSync(process.cwd() + '/sql/addSetup.sql', {encoding: 'utf8'});
            connection.query(sql, [
                name, time, JSON.stringify(roles),
                JSON.stringify(channelText),
                JSON.stringify(channelVoice),
                JSON.stringify(channelCategory),
                totalItems], (err1) => {
                if (err1) return reject(err1);
                return resolve(true);
            });
        });
    });
}
