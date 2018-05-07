import { DataResponseInterface } from '../types/dataresponse.interface';

export abstract class BaseIndicator {
    constructor() {}

    /**
     * @protected
     * @abstract
     * @param {DataResponseInterface[]} prices
     * @param {number} period
     * @returns {number}
     * @memberof BaseIndicator
     */
    protected abstract calculate(prices: DataResponseInterface[], period: number): number;
}
