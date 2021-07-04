
export interface Symbol {
    symbol: string
    status: string
    baseAsset: string
    baseAssetPrecision: number
    quoteAsset: string
    quotePrecision: number
    quoteAssetPrecision: number
    baseCommissionPrecision: number
    quoteCommissionPrecision: number
    orderTypes: string[]
    icebergAllowed: boolean
    ocoAllowed: boolean
    quoteOrderQtyMarketAllowed: boolean
    isSpotTradingAllowed: boolean
    isMarginTradingAllowed: boolean
    filters: Filter[]
    permissions: string[]
    bookTicker? :BookTicker
}
