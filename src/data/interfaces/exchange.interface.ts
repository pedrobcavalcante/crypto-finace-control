import UserPortfolio from "../../domain/entities/user-portfolio.entitie";
import { ExchangeInfo } from "../../domain/models/exchange-info";
import { LimitParams, MarketParams } from "../../domain/usecases/protocols/exchange";

export default interface Exchange{
    getAccount():  Promise<any>
    getInfo():  Promise<ExchangeInfo>
    sell(params: LimitParams): Promise<void>
    getPrice(symbol: string) : Promise<string>
    buy(params: LimitParams): Promise<void>
    marketSell(params: MarketParams): Promise<void>
    marketBuy(params: MarketParams): Promise<void>
    getUserPortfolio(userKey:String, userSecret:String) : Promise<UserPortfolio>
}

