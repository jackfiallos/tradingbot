import * as fs from 'fs';
import * as path from 'path';
import * as restify from 'restify';
import _ from 'lodash';

import { ErrorsConstant } from '../constants/errors.constant';
import { settings } from '../config/config';
import { CexIOApi } from '../core/datasources/cex.api';

const config: any = [
    {
        meta: {
            name: 'home',
            method: 'GET',
            paths: [
                '/'
            ]
        },
        middleware: (request: restify.Request, response: restify.Response, next: restify.Next) => {
            response.send({
                status: ErrorsConstant.ForbiddenError,
                error: ErrorsConstant[ErrorsConstant.ForbiddenError],
                message: 'Please login'
            });
            return next();
        }
    },
    {
        meta: {
            name: 'import',
            method: 'GET',
            paths: [
                '/import'
            ]
        },
        middleware: (request: restify.Request, response: restify.Response, next: restify.Next) => {
            const datasource: CexIOApi = new CexIOApi('BTC', 'EUR');
            datasource.getData(5)
                .then((res) => {
                    response.send(res);
                    return next();
                })
                .catch((err) => {
                    response.send(err);
                    return next();
                });
        }
    }
];

module.exports.config = config;
