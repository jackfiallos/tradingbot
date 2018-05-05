import * as _ from 'lodash';
import * as moment from 'moment';

import axios, { AxiosRequestConfig, AxiosPromise, AxiosResponse, AxiosError } from 'axios';
import { DatasourceInterface } from '../../interfaces/datasource.interface';
import { DataResponse } from '../../interfaces/dataresponse.interface';
 
export class CexIOApi extends DatasourceInterface {
    constructor(from: string, to: string) {
        super(from, to);
    }

    /**
     * @protected
     * @returns {AxiosPromise<DataResponse>}
     * @memberof CexIOApi
     */
    public getData(limit: number): AxiosPromise<DataResponse[]> {
        return axios.get<any>(`https://min-api.cryptocompare.com/data/histominute?fsym=${this.cryptoFrom}&tsym=${this.cryptoTo}&limit=${limit}&e=cexio`)
            .then((res: AxiosResponse<any>) => {
                let dataresponse: DataResponse[] = [];

                if (res.data && res.data.Data.length > 0) {
                    dataresponse = _.map(res.data.Data, (data): DataResponse => {
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
