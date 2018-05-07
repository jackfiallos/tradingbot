export interface ConfigInterface {
    app: {
        name: string;
        version: string;
    },
    port: number;
    env: string;
    log: string;
    server: {
        throttleRate: number;
        throttleBurst: number;
    },
    db: {
        host: string;
        port: number;
        user: string;
        password: string;
        database: string;
        dialect: string;
    },
    datasources: string[];
}
