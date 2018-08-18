import { readFileSync } from 'fs';
import { ISQLSetup } from '../../../declarations';
import { pool } from '../init';

export default function getSetup(name: string): Promise<ISQLSetup> {
    return new Promise<ISQLSetup>((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) return reject(err);
            const sql = readFileSync(process.cwd() + '/sql/getSetup.sql', {encoding: 'utf8'});
            connection.query(sql, [name], (err1, results) => {
                if (err1) return reject(err1);
                if (results.length === 0) return resolve(null);
                else {
                    resolve({
                        name: results[0].name,
                        roles: JSON.parse(results[0].roles),
                        channelText: JSON.parse(results[0].channelText),
                        channelVoice: JSON.parse(results[0].channelVoice),
                        channelCategory: JSON.parse(results[0].channelCategory),
                        totalItems: results[0].totalItems
                    });
                }
            });
        });
    });
}
