import * as path from 'path';
import * as bunyan from 'bunyan';
import * as stream from 'stream';
import { settings } from '../config/config';

let infoStream = new stream.Writable();
infoStream.writable = true;

infoStream.write = (info: any): boolean => {
    console.log(JSON.parse(info).msg);
    return true;
};

export let logger = bunyan.createLogger({
    name: settings.app.name,
    streams: [
        {
            level: 'info',
            stream: infoStream
        },
        {
            level: 'error',
            path: path.join(__dirname, settings.log, `${settings.env}-${settings.app.name}.log`)
        }
    ]
});
