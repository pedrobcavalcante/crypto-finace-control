import LogErrorRepository from "../../../data/protocols/log-repository";
import Exchange from "../protocols/exchange";

export default class ExchangeAccount{
    private readonly exchange: Exchange
    private readonly logger: LogErrorRepository
    constructor(exchange: Exchange, logger: LogErrorRepository) {
        this.exchange = exchange;
        this.logger = logger
    }

    async getPrice(symbol: string) {            
      try {
        await this.exchange.getPrice(symbol);
      } catch (error) {        
        this.logger.log(error);
      }
    }
}