import BinanceExchange from "../adapters/binance-echange"
import env from '../config/env'

export const makeBinance = (): BinanceExchange => {
    const binance = new BinanceExchange(env.API_KEY, env.API_SECRET)
    return binance
}