import { RateLimit } from "./rateLimit.model";
import { Symbol } from "./symbol.model";

export interface ExchangeInfo {
    timezone: string
    serverTime: number
    rateLimits: RateLimit[]
    exchangeFilters: any[]
    symbols: Symbol[]
}
