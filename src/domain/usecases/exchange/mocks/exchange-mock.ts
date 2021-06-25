import Exchange, { LimitParams, MarketParams } from "../../protocols/exchange"

export default class ExchangeStub implements Exchange{
    getInfo(): Promise<any> {
        return Promise.resolve()
    }
    sell(params: LimitParams): Promise<void> {
        return Promise.resolve()
    }
    marketSell(params: MarketParams): Promise<void> {
        return Promise.resolve()
    }
    marketBuy(params: MarketParams): Promise<void> {
        return Promise.resolve()
    }      
    buy(params: LimitParams): Promise<void> {
        return Promise.resolve()
    }       
}