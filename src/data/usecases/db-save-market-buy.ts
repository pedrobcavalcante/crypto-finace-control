import SavePayloadRepository, { ORDER_TYPE_MARKET_BUY, Payload } from "../protocols/db-save-payload-repository";
import LogErrorRepository from "../protocols/log-repository";

export default class SaveMarketOrderBuy implements SavePayloadRepository{
    private readonly logger: LogErrorRepository  
    private readonly savePayloadRepository: SavePayloadRepository  

    constructor(logger: LogErrorRepository,savePayloadRepository: SavePayloadRepository){
        this.logger = logger;   
        this.savePayloadRepository = savePayloadRepository    
    }
    
    async save(payload: Payload) {
        const paylaod_with_order_type = Object.assign({}, payload, { order_type: ORDER_TYPE_MARKET_BUY })
        try {
            await this.savePayloadRepository.save(paylaod_with_order_type);
          } catch (error) {        
            this.logger.log(error);
            console.log(error);
          }
        
    }

    
   

}