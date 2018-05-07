import { ConfigInterface } from '../interfaces/config.interface';

const env = process.env.NODE_ENV || 'development';

export const settings: ConfigInterface = {
    app: {
        name: 'trading-bot',
        version: '1.0.0'
    },
    port: 3000,
    env: 'dev',
    log: '../../logs',
    server: {
        throttleRate: 50,
        throttleBurst: 100
    },
    db: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'mariadbmacos',
        database: 'tradingbot',
        dialect: 'mysql'
    },
    datasources: [
        'CEX.io'
    ]
};

if (env === 'production') {
    settings.env = 'prod';
    // other production settings
}
