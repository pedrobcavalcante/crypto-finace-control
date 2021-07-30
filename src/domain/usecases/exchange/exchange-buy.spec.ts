import LogErrorRepository from "../../../data/protocols/log-repository"
import Exchange, { LimitParams } from "../protocols/exchange"
import ExchangeLimitedBuy from "./exchange-buy"
import ExchangeStub from "./mocks/exchange.mock"
import LoggerStub from "./mocks/log.mock"

interface typeSut{
    sut: ExchangeLimitedBuy, 
    exchangeStub: Exchange, 
    logger: LogErrorRepository,
    params: LimitParams
}

const makeSut = (): typeSut => {  
    const params: LimitParams = {
        pair: 'valid_pair',
        quantity: 'valid_value',
        price: 'valid_price'
    }    
    const logger = new LoggerStub()
    const exchangeStub = new ExchangeStub()
    const sut = new ExchangeLimitedBuy(exchangeStub, logger)

    return { sut , exchangeStub, logger, params }
}

describe('Test Exchange buy', () => {
    test('Should call exchange method buy from exchange', async () => {        
        const {sut, exchangeStub, params }  = makeSut()
        const executeSpy = jest.spyOn(exchangeStub, 'buy')
        await sut.execute(params)

        expect(executeSpy).toBeCalled()         
    })

    test('Should call exchange method execute with correct values', async () => {       
        const {sut, exchangeStub, params }  = makeSut()
        const executeSpy = jest.spyOn(exchangeStub, 'buy')
        await sut.execute(params)

        expect(executeSpy).toBeCalledWith(params)
    })


    test('Should method execute log a error', async () => {       
        const {sut, exchangeStub, logger, params }  = makeSut() 
        const logSpy = jest.spyOn(logger, 'log')
        jest
          .spyOn(exchangeStub, 'buy')
          .mockReturnValueOnce(Promise.reject(new Error()))        
        await sut.execute(params)

        expect(logSpy).toBeCalled()
    })
   
})