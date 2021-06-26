import Exchange, { LimitParams, MarketParams } from "../../domain/usecases/protocols/exchange";
import { ExchangeInfo } from "../../models/exchangeInfo.model";
const Binance = require('node-binance-api');

export default class BinanceExchange implements Exchange{
    private readonly binance: any
    
    constructor(apiKey: string, apiSecret: string) {        
        this.binance = new Binance().options({
            APIKEY: apiKey,
            APISECRET: apiSecret
        });        
    }

    async getAccount(): Promise<any> {      
        return await this.binance.account()
    }
    
    async getInfo(): Promise<ExchangeInfo> {      
        return await this.binance.exchangeInfo()
    }
    sell(params: LimitParams): Promise<void> {
        throw new Error("Method not implemented.");
    }
    buy(params: LimitParams): Promise<void> {
        throw new Error("Method not implemented.");
    }
    marketSell(params: MarketParams): Promise<void> {
        throw new Error("Method not implemented.");
    }
    marketBuy(params: MarketParams): Promise<void> {
        throw new Error("Method not implemented.");
    }

}