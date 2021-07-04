import { RateLimit } from "./rate-limit";
import { Symbol } from "./symbol";

export interface ExchangeInfo {
    timezone: string
    serverTime: number
    rateLimits: RateLimit[]
    exchangeFilters: any[]
    symbols: Symbol[]
}
