import { ConfigInterface } from '../interfaces/config.interface';

let env = process.env.NODE_ENV || 'development';

export let settings: ConfigInterface = {
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
    datasources: [
        'CEX.io'
    ]
};

if (env === 'production') {
    settings.env = 'prod';
    // other production settings
}
