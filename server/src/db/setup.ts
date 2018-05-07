import 'reflect-metadata';
import { createConnection, ConnectionOptions } from 'typeorm';
import { settings } from '../config/config';

const options: ConnectionOptions = {
    type: 'mysql',
    host: settings.db.host,
    port: settings.db.port,
    username: settings.db.user,
    password: settings.db.password,
    database: settings.db.database,
    entities: [
        __dirname + '/entities/*.js'
    ],
    synchronize: true,
    logging: false
};

export const configDB = createConnection(options);
