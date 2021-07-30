import LogErrorRepository from "../../../data/protocols/log-repository"
import Exchange, { MarketParams } from "../protocols/exchange"
import ExchangeMarketBuy from "./exchange-market-buy"
import ExchangeStub from "./mocks/exchange.mock"
import LoggerStub from "./mocks/log.mock"

interface typeSut{
    sut: ExchangeMarketBuy, 
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
    const sut = new ExchangeMarketBuy(exchangeStub, logger)

    return { sut , exchangeStub, logger, params }
}

describe('Test Exchange marketBuy', () => {
    test('Should call exchange method marketBuy from exchange', async () => {        
        const {sut, exchangeStub, params }  = makeSut()
        const marketBuySpy = jest.spyOn(exchangeStub, 'marketBuy')
        await sut.execute(params)

        expect(marketBuySpy).toBeCalled()         
    })

    test('Should call exchange method buy with correct values', async () => {        
        const {sut, exchangeStub, params }  = makeSut()
        const marketBuySpy = jest.spyOn(exchangeStub, 'marketBuy')
        await sut.execute(params)

        expect(marketBuySpy).toBeCalledWith(params)
    })

    test('Should method buy log a error', async () => {        
        const {sut, exchangeStub, logger, params }  = makeSut() 
        const logSpy = jest.spyOn(logger, 'log')
        jest
          .spyOn(exchangeStub, 'marketBuy')
          .mockReturnValueOnce(Promise.reject(new Error()))        
        await sut.execute(params)

        expect(logSpy).toBeCalled()
    })   
})