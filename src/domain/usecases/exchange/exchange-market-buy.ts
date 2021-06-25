import LogErrorRepository from "../../../data/protocols/log-repository";
import Exchange, { MarketParams } from "../protocols/exchange";

export default class ExchangeBuy{
    private readonly exchange: Exchange
    private readonly logger: LogErrorRepository
    constructor(exchange: Exchange, logger: LogErrorRepository) {
        this.exchange = exchange;
        this.logger = logger
    }

    async marketBuy(params: MarketParams) {            
      try {
        await this.exchange.marketBuy(params);
      } catch (error) {        
        this.logger.log(error);
        console.log(error);
      }
    }
}