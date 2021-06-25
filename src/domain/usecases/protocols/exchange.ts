export interface LimitParams{
    pair: string, 
    quantity: string
}

export interface MarketParams{
     pair: string, 
     quantity: string, 
     price: string
}
  
export default interface Exchange{
    getInfo(): Promise<any>    
    sell(params: LimitParams): Promise<void>        
    buy(params: LimitParams): Promise<void>        
    marketSell(params: MarketParams): Promise<void>
    marketBuy(params: MarketParams): Promise<void>   
}

