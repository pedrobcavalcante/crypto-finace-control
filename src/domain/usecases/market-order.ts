import { MarketParams } from "./protocols/exchange";

export default interface MarketOrder{
    execute(params: MarketParams): Promise<void>
}