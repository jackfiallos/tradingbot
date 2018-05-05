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
    datasources: string[];
}
