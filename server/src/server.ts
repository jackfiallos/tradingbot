import * as fs from 'fs';
import * as path from 'path';
import * as restify from 'restify';
import * as corsMiddleware from 'restify-cors-middleware';
import * as socketIo from 'socket.io';

import { settings } from './config/config';
import { logger } from './services/logger';
import { ConfigInterface } from './interfaces/types/config.interface';
import { RouteInterface } from './interfaces/types/route.interface';
import { configDB } from './db/setup';
import { Connection } from 'typeorm';

export let api: restify.Server = restify.createServer({
    name: settings.app.name,
    version: settings.app.version,
    log: logger
});

const io: SocketIO.Server = socketIo.listen(api.server);

const throttleOptions = {
    rate: settings.server.throttleRate,
    burst: settings.server.throttleBurst,
    ip: false,
    username: true
};

const plugins: any[] = [
    restify.plugins.acceptParser(api.acceptable),
    restify.plugins.throttle(throttleOptions),
    restify.plugins.dateParser(),
    restify.plugins.queryParser(),
    restify.plugins.fullResponse(),
    restify.plugins.bodyParser(),
    restify.plugins.gzipResponse(),
    restify.plugins.urlEncodedBodyParser(),
    restify.plugins.authorizationParser()
];

api.use(plugins);

const options: corsMiddleware.Options = {
    preflightMaxAge: 5, //Optional
    origins: ['*'],
    allowHeaders: ['Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token, Authorization, API-Token'],
    exposeHeaders: ['API-Token-Expiry']
};

const cors: corsMiddleware.CorsMiddleware = corsMiddleware(options);

api.pre(cors.preflight);
api.use(cors.actual);

/**
 * Setup routes
 */
const registerRoute = (route: RouteInterface, conf: ConfigInterface, server: any) => {
    const routeName = route.meta.name;
    const routeMethod: string = route.meta.method.toLowerCase();

    for (const uri of route.meta.paths) {
        const routeMeta = {
            name: routeName,
            path: uri,
            version: conf.app.version
        };

        if (route.validate) {
            server[routeMethod](routeMeta, route.validate, route.middleware);
        } else {
            server[routeMethod](routeMeta, route.middleware);
        }
    }
};

/**
 * Setup controllers
 */
const setupControllers = (controller: string, conf: ConfigInterface, server: restify.Server) => {
    const routes = require(path.join(__dirname, 'controllers', controller));
    routes.config.forEach((element: any, index: number) => {
        registerRoute(element, conf, server);
    });
};

// enabled controllers files
[
    'home.controller',
].forEach((element, index: number) => {
    setupControllers(element, settings, api);
});

api.listen(settings.port, () => {
    logger.info(`${settings.app.name} is running at ${api.url}`);

    // connect to BD
    configDB.then((connection: Connection) => {
        console.info('INFO: Database connection has been established successfully.');
    })
    .catch((err: any) => {
        console.error('Unable to connect to the database:', err);
    });
});

/**
 * Inject extra header response
 */
api.use((req, res, next) => {
    res.header('API-RND', Math.floor(Date.now() / 1000));
    return next();
});

/**
 * Error Handling
 */
api.on('uncaughtException', (req, res, err, next) => {
    logger.error({
        source: 'uncaughtException',
        err: err.body,
        headers: req.headers,
        method: req.method
    });
    return next();
});

api.on('restifyError', (request: restify.Request, response: restify.Response, err: any, next: any) => {
    logger.error({
        source: 'restifyError',
        err: err.body,
        headers: request.headers,
        route: request.getRoute()
    });
    return next();
});

/**
 * Sockets Handling
 */
io.sockets.on('connection', (socket) => {
    // socket.emit('news', { hello: 'world' });
    socket.on('subscribeToTimer', (interval) => {
        // console.log('client is subscribing to timer with interval ', interval);
        setInterval(() => {
            socket.emit('timer', new Date());
        }, interval);
    });
});
