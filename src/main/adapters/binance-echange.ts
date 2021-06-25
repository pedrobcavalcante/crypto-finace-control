import Exchange, { LimitParams, MarketParams } from "../../domain/usecases/protocols/exchange";
import Binance from 'node-binance-api';

export default class BinanceExchange implements Exchange{
    private readonly binance: any
    
    constructor(apiKey?: string, apiSecret?: string) {
        this.binance = new Binance()
        this.binance.options({
            APIKEY: apiKey || "",
            APISECRET: apiSecret || "",
        });
    }
    
    getInfo(): Promise<any> {
        throw new Error("Method not implemented.");
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