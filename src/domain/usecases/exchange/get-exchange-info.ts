
import LogErrorRepository from "../../../data/protocols/log-repository";
import { ExchangeInfo } from "../../models/exchange-info";
import Exchange from "../protocols/exchange";


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
            this.exchangeInfo = await this.exchange.getAccount();            
          } catch (error) {        
            this.logger.log(error);
            console.log(error);
          }
          //TODO melhorar o retorno
          return this.exchangeInfo;          
        }
    }
    
}