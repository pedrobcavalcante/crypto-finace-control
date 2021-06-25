import LogErrorRepository from "../../../data/protocols/log-repository";
import Exchange, { LimitParams } from "../protocols/exchange";

export default class ExchangeBuy{
    private readonly exchange: Exchange
    private readonly logger: LogErrorRepository
    constructor(exchange: Exchange, logger: LogErrorRepository) {
        this.exchange = exchange;
        this.logger = logger
    }

    async buy(params: LimitParams) {            
      try {
        await this.exchange.buy(params);
      } catch (error) {        
        this.logger.log(error);
        console.log(error);
      }
    }
}