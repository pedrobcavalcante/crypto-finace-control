
export interface Filter {
    filterType: string
    minPrice?: string
    maxPrice?: string
    tickSize?: string
    multiplierUp?: string
    multiplierDown?: string
    avgPriceMins?: number
    minQty?: string
    maxQty?: string
    stepSize?: string
    minNotional?: string
    applyToMarket?: boolean
    limit?: number
    maxNumOrders?: number
    maxNumAlgoOrders?: number
}
