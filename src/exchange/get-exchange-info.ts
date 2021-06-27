
import LogErrorRepository from "../data/protocols/log-repository";
import { ExchangeInfo } from "../domain/models/exchange-info";
import Exchange from "../domain/usecases/protocols/exchange";


export default class GetExchangeInfo{
    private readonly exchange: Exchange
    private readonly logger: LogErrorRepository    
    private exchangeInfo!: ExchangeInfo;
    private exchangeInfoexists = false;

    constructor(exchange: Exchange, logger: LogErrorRepository) {
        this.exchange = exchange
        this.logger = logger
    }

    async get(): Promise<any> {        
        if (this.exchangeInfoexists) {
          return this.exchangeInfo;
        } else {
          try {            
            this.exchangeInfo = await this.exchange.getInfo();            
          } catch (error) {        
            this.logger.log(error);
          }
          //TODO melhorar o retorno
          return this.exchangeInfo;          
        }
    }
    
}