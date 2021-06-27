import GetExchangeInfo from "../domain/usecases/exchange/get-exchange-info"
import { makeBinance } from "./factories/binance"
import { makeTxtLogger } from "./factories/logger"

const main = async () => {
    const binance = makeBinance()
    const logger = makeTxtLogger()

    const getExchangeInfo: GetExchangeInfo = new GetExchangeInfo(binance, logger)
    const value = await getExchangeInfo.get()
    console.log(value)
}


main()