import LogErrorRepository from "../../../data/protocols/log-repository";
import LimitedOrder from "../limited-order";
import Exchange, { LimitParams } from "../protocols/exchange";

export default class ExchangeLimitedSell implements LimitedOrder{
    private readonly exchange: Exchange
    private readonly logger: LogErrorRepository
    constructor(exchange: Exchange, logger: LogErrorRepository) {
        this.exchange = exchange;
        this.logger = logger
    }

    async execute(params: LimitParams) {            
      try {
        await this.exchange.sell(params);
      } catch (error) {        
        this.logger.log(error);
      }
    }
}