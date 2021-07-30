import LogErrorRepository from "../../../data/protocols/log-repository";
import MarketOrder from "../market-order";
import Exchange, { MarketParams } from "../protocols/exchange";

export default class ExchangeMarketSell implements MarketOrder{
    private readonly exchange: Exchange
    private readonly logger: LogErrorRepository
    constructor(exchange: Exchange, logger: LogErrorRepository) {
        this.exchange = exchange;
        this.logger = logger
    }

    async execute(params: MarketParams) {            
      try {
        await this.exchange.marketSell(params);
      } catch (error) {        
        this.logger.log(error);        
      }
    }
}