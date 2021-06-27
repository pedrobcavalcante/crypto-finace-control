export interface CoinList {
    startCoin?: string
    coinListTickers?: CoinListTicker[];
}

export interface CoinListTicker {
    coin?: string
    value?: Number
}