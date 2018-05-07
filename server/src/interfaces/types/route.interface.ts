import * as restify from 'restify';

export interface RouteInterface {
    meta: {
        name: string;
        method: string;
        paths: string[];
    },
    middleware: restify.RequestHandler | restify.Next;
    validate?: restify.RequestHandler | restify.Next;
}
