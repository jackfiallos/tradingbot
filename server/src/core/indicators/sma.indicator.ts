import { BaseIndicator } from '../../interfaces/classes/baseindicator.interface';
import { DataResponseInterface } from '../../interfaces/types/dataresponse.interface';

export class SMAIndicator extends BaseIndicator {
    /**
     * Creates an instance of SMAIndicator.
     * @memberof SMAIndicator
     */
    constructor() {
        super();
    }

    /**
     * @param {DataResponseInterface[]} prices 
     * @param {number} period 
     * @returns {number} 
     * @memberof SMAIndicator
     */
    public calculate(prices: DataResponseInterface[], period: number): number {
        const sma = prices.slice(0, period).reduce((sum: number, cur: DataResponseInterface) => {
            return sum + cur.close;
        }, 0);

        return sma / period;
    }
}
