import LogErrorRepository from "../data/protocols/log-repository";
import LimitedOrder from "../domain/usecases/limited-order";
import Exchange, { LimitParams } from "../domain/usecases/protocols/exchange";

export default class ExchangeLimitedBuy implements LimitedOrder{
    private readonly exchange: Exchange
    private readonly logger: LogErrorRepository
    constructor(exchange: Exchange, logger: LogErrorRepository) {
        this.exchange = exchange;
        this.logger = logger
    }

    async execute(params: LimitParams) {            
      try {
        await this.exchange.buy(params);
      } catch (error) {        
        this.logger.log(error);
      }
    }
}