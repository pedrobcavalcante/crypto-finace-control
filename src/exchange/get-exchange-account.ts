import LogErrorRepository from "../data/protocols/log-repository";
import Exchange from "../domain/usecases/protocols/exchange";

export default class ExchangeAccount{
    private readonly exchange: Exchange
    private readonly logger: LogErrorRepository
    constructor(exchange: Exchange, logger: LogErrorRepository) {
        this.exchange = exchange;
        this.logger = logger
    }

    async getAccount() {            
      try {
        await this.exchange.getAccount();
      } catch (error) {        
        this.logger.log(error);
      }
    }
}