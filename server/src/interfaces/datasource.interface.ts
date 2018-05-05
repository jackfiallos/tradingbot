import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';
import { DataResponse } from './dataresponse.interface';

export abstract class DatasourceInterface {
    protected cryptoFrom: string;
    protected cryptoTo: string;

    /**
     * Creates an instance of Datasource.
     * @param {string} name
     * @memberof Datasource
     */
    constructor(cryptoFrom: string, cryptoTo: string) {
        this.cryptoFrom = cryptoFrom;
        this.cryptoTo = cryptoTo;
    }

    /**
     * @abstract
     * @returns {DataResponse}
     * @memberof Datasource
     */
    protected abstract getData(limit: number): AxiosPromise<DataResponse[]>;
}
