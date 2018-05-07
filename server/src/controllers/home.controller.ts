import * as fs from 'fs';
import * as path from 'path';
import * as restify from 'restify';
import _ from 'lodash';

import { ErrorsConstant } from '../constants/errors.constant';
import { settings } from '../config/config';
import { CryptoCompareAPI } from '../core/datasources/cryptocompare.api';
import { DataResponseInterface } from '../interfaces/types/dataresponse.interface';
import { getManager, EntityManager } from 'typeorm';
import { Historical as HistoricalEntity } from '../db/entities/historical.entity';

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
        middleware: async (request: restify.Request, response: restify.Response, next: restify.Next) => {
            try {
                const datasource: CryptoCompareAPI = new CryptoCompareAPI('BTC', 'EUR');
                const tradingData = await datasource.getData();

                const connectionManager: EntityManager = getManager();

                for (const data of tradingData) {
                    const dataResponse = new HistoricalEntity();
                    dataResponse.time = data.time;
                    dataResponse.close = data.close;
                    dataResponse.high = data.high;
                    dataResponse.low = data.low;
                    dataResponse.open = data.open;
                    dataResponse.volumefrom = data.volumefrom;
                    dataResponse.volumeto = data.volumeto;
                    dataResponse.datasource = 'cryptocompare';

                    connectionManager.save(dataResponse);
                }

                response.send(tradingData);
            } catch(err) {
                response.send(err);
            } finally {
                return next();
            }
        }
    }
];

module.exports.config = config;
