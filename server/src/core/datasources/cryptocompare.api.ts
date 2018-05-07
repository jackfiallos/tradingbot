import * as _ from 'lodash';
import * as moment from 'moment';

import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { DatasourceInterface } from '../../interfaces/classes/datasource.interface';
import { DataResponseInterface } from '../../interfaces/types/dataresponse.interface';
 
export class CryptoCompareAPI extends DatasourceInterface {
    constructor(from: string, to: string) {
        super(from, to);
    }

    /**
     * @protected
     * @returns {AxiosPromise<DataResponseInterface>}
     * @memberof CryptoCompareAPI
     */
    public getData(limit: number = 1): Promise<DataResponseInterface[]> {
        return axios.get<any>(`https://min-api.cryptocompare.com/data/histominute?fsym=${this.cryptoFrom}&tsym=${this.cryptoTo}&limit=${limit}`)
            .then((res: AxiosResponse<any>) => {
                let dataresponse: DataResponseInterface[] = [];

                if (res.data && res.data.Data.length > 0) {
                    dataresponse = _.map(res.data.Data, (data): DataResponseInterface => {
                        return {
                            time: moment.unix(data.time).toDate(),
                            close: data.close,
                            high: data.high,
                            low: data.low,
                            open: data.open,
                            volumefrom: data.volumefrom,
                            volumeto: data.volumeto,
                        };
                    });
                }

                return dataresponse;
            })
            .catch((err) => {
                return err;
            });
    }
}
