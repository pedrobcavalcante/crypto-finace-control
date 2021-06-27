import { ExchangeInfo } from "../../../models/exchange-info"
import Exchange, { LimitParams, MarketParams } from "../../protocols/exchange"

export default class ExchangeStub implements Exchange{
    getAccount(): Promise<any> {
        return Promise.resolve()
    }    
    getInfo(): Promise<ExchangeInfo>{
        return Promise.resolve({
            timezone: 'string',
            serverTime: 0,
            rateLimits: [],
            exchangeFilters: [],
            symbols: []
        })
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
    getPrice(symbol: string): Promise<string> {
        return Promise.resolve(symbol)
    }     
}