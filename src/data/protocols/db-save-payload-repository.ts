export const ORDER_TYPE_MARKET_SELL = 'MARKET_SELL'
export const ORDER_TYPE_MARKET_BUY = 'MARKET_BUY'
export const ORDER_TYPE_SELL = 'SELL'
export const ORDER_TYPE_BUY = 'BUY'

export interface Payload{
    symbol: string 
    payload: any
}

export default interface SavePayloadRepository{
    save(payload: Payload): Promise<any>
}