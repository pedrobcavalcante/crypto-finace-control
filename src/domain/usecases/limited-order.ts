import { LimitParams } from "./protocols/exchange";

export default interface LimitedOrder{
    execute(params: LimitParams): Promise<void>
}