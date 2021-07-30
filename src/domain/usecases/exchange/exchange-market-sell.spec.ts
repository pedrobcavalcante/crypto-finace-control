import LogErrorRepository from "../../../data/protocols/log-repository"
import Exchange, { MarketParams } from "../protocols/exchange"
import ExchangeMarketSell from "./exchange-market-sell"
import ExchangeStub from "./mocks/exchange.mock"
import LoggerStub from "./mocks/log.mock"

interface typeSut{
    sut: ExchangeMarketSell, 
    exchangeStub: Exchange, 
    logger: LogErrorRepository, 
    params: MarketParams
}

const makeSut = (): typeSut => {      
    const params: MarketParams = {
        pair: 'valid_pair',
        quantity: 'valid_value'         
    }
    const logger = new LoggerStub()
    const exchangeStub = new ExchangeStub()
    const sut = new ExchangeMarketSell(exchangeStub, logger)

    return { sut , exchangeStub, logger, params }
}

describe('Test Exchange marketSell', () => {
    test('Should call exchange method marketSell from exchange', async () => {        
        const {sut, exchangeStub, params }  = makeSut()
        const marketBuySell = jest.spyOn(exchangeStub, 'marketSell')
        await sut.execute(params)

        expect(marketBuySell).toBeCalled()         
    })

    test('Should call exchange method buy with correct values', async () => {        
        const {sut, exchangeStub, params }  = makeSut()
        const marketBuySell = jest.spyOn(exchangeStub, 'marketSell')
        await sut.execute(params)

        expect(marketBuySell).toBeCalledWith(params)
    })

    test('Should method buy log a error', async () => {        
        const {sut, exchangeStub, logger, params }  = makeSut() 
        const logSpy = jest.spyOn(logger, 'log')
        jest
          .spyOn(exchangeStub, 'marketSell')
          .mockReturnValueOnce(Promise.reject(new Error()))        
        await sut.execute(params)

        expect(logSpy).toBeCalled()
    })   
})