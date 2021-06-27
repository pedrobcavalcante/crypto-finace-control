import LogErrorRepository from "../../../data/protocols/log-repository"
import Exchange from "../protocols/exchange"
import ExchangeAccount from "./get-exchange-account"
import ExchangeStub from "./mocks/exchange.mock"
import LoggerStub from "./mocks/log.mock"

interface typeSut{
    sut: ExchangeAccount, 
    exchangeStub: Exchange, 
    logger: LogErrorRepository     
}

const makeSut = (): typeSut => {        
    const logger = new LoggerStub()
    const exchangeStub = new ExchangeStub()
    const sut = new ExchangeAccount(exchangeStub, logger)

    return { sut , exchangeStub, logger }
}

describe('Test Exchange get account info', () => {
    test('Should call exchange method getAccount from exchange', async () => {        
        const {sut, exchangeStub }  = makeSut()
        const getAccountSpy = jest.spyOn(exchangeStub, 'getAccount')
        await sut.getAccount()

        expect(getAccountSpy).toBeCalled()         
    })
  

    test('Should method getAccount log a error', async () => {        
        const {sut, exchangeStub, logger }  = makeSut() 
        const logSpy = jest.spyOn(logger, 'log')
        jest
          .spyOn(exchangeStub, 'getAccount')
          .mockReturnValueOnce(Promise.reject(new Error()))        
        await sut.getAccount()

        expect(logSpy).toBeCalled()
    })   
})