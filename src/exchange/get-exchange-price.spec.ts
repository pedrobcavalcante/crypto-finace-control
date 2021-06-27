import LogErrorRepository from "../data/protocols/log-repository"
import Exchange from "../domain/usecases/protocols/exchange"
import ExchangePrice from "./get-exchange-price"
import ExchangeStub from "./mocks/exchange.mock"
import LoggerStub from "./mocks/log.mock"

interface typeSut{
    sut: ExchangePrice, 
    exchangeStub: Exchange, 
    logger: LogErrorRepository     
}

const makeSut = (): typeSut => {        
    const logger = new LoggerStub()
    const exchangeStub = new ExchangeStub()
    const sut = new ExchangePrice(exchangeStub, logger)

    return { sut , exchangeStub, logger }
}

describe('Test Exchange get account info', () => {
    test('Should call exchange method getPrice from exchange', async () => {        
        const {sut, exchangeStub }  = makeSut()
        const getPriceSpy = jest.spyOn(exchangeStub, 'getPrice')
        await sut.getPrice('valid_symbol')

        expect(getPriceSpy).toBeCalled()         
    })
  
    test('Should call exchange method getPrice with correct values', async () => {        
        const {sut, exchangeStub }  = makeSut()
        const getPriceSpy = jest.spyOn(exchangeStub, 'getPrice')
        await sut.getPrice('valid_symbol')

        expect(getPriceSpy).toBeCalledWith('valid_symbol')
    })

    test('Should method getPrice log a error', async () => {        
        const {sut, exchangeStub, logger }  = makeSut() 
        const logSpy = jest.spyOn(logger, 'log')
        jest
          .spyOn(exchangeStub, 'getPrice')
          .mockReturnValueOnce(Promise.reject(new Error()))        
        await sut.getPrice('valid_symbol')

        expect(logSpy).toBeCalled()
    })   
})