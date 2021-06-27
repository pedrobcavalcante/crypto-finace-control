import { ExchangeInfo } from "../../models/exchange-info";

export interface LimitParams{
    pair: string, 
    quantity: string,
    price: string
}
export interface MarketParams{
     pair: string, 
     quantity: string
}  
export default interface Exchange{
    getAccount():  Promise<any>
    getInfo():  Promise<ExchangeInfo>
    sell(params: LimitParams): Promise<void>
    getPrice(symbol: string) : Promise<string>
    buy(params: LimitParams): Promise<void>
    marketSell(params: MarketParams): Promise<void>
    marketBuy(params: MarketParams): Promise<void>
}

