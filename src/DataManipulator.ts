import { ServerRespond } from './DataStreamer';

export interface Row {
  price_abc: number,
  price_def: number,
  ratio: number,
  high_bound: number,
  low_bound: number,
  trigger: number | undefined,
  timestamp: Date,
}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]): Row {
    const priceABC = (serverResponds[0].top_ask.price + serverResponds[0].top_bid.price) / 2
    const priceDEF = (serverResponds[1].top_ask.price + serverResponds[1].top_bid.price) / 2
    const ratio = priceABC / priceDEF
    const upperbound = 1 + 0.05
    const lowerbound = 1 - 0.05
    return {
      price_abc: priceABC,
      price_def: priceDEF,
      ratio: ratio,
      high_bound: upperbound,
      low_bound: lowerbound,
      trigger: (ratio > upperbound || ratio < lowerbound) ? ratio : undefined, 
      timestamp: (serverResponds[0].timestamp > serverResponds[1].timestamp) ? serverResponds[0].timestamp : serverResponds[1].timestamp,
    };
  }
}
