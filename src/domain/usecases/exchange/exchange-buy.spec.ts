import LogErrorRepository from "../../../data/protocols/log-repository"
import Exchange, { LimitParams } from "../protocols/exchange"
import ExchangeBuy from "./exchange-buy"
import ExchangeStub from "./mocks/exchange-mock"
import LoggerStub from "./mocks/log-mock"

interface typeSut{
    sut: ExchangeBuy, 
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
    const sut = new ExchangeBuy(exchangeStub, logger)

    return { sut , exchangeStub, logger, params }
}

describe('Test Exchange buy', () => {
    test('Should call exchange method buy from exchange', async () => {        
        const {sut, exchangeStub, params }  = makeSut()
        const buySpy = jest.spyOn(exchangeStub, 'buy')
        await sut.buy(params)

        expect(buySpy).toBeCalled()         
    })

    test('Should call exchange method buy with correct values', async () => {       
        const {sut, exchangeStub, params }  = makeSut()
        const buySpy = jest.spyOn(exchangeStub, 'buy')
        await sut.buy(params)

        expect(buySpy).toBeCalledWith(params)
    })


    test('Should method buy log a error', async () => {       
        const {sut, exchangeStub, logger, params }  = makeSut() 
        const logSpy = jest.spyOn(logger, 'log')
        jest
          .spyOn(exchangeStub, 'buy')
          .mockReturnValueOnce(Promise.reject(new Error()))        
        await sut.buy(params)

        expect(logSpy).toBeCalled()
    })
   
})