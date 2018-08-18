import { createPool, Pool } from 'mysql';
import { Logger } from '../Logger/Logger';

const pool: Pool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    multipleStatements: true,
    charset: 'utf8mb4'
});

new Logger(process.stdout, false).info('Database Pool connected successfully.');

export {pool};
