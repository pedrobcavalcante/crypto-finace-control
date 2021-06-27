import LogErrorRepository from "../../../data/protocols/log-repository"
import { ExchangeInfo } from "../../models/exchange-info"
import Exchange from "../protocols/exchange"
import GetExchangeInfo from "./get-exchange-info"
import ExchangeStub from "./mocks/exchange.mock"
import LoggerStub from "./mocks/log.mock"

interface typeSut{
    sut: GetExchangeInfo, 
    exchangeStub: Exchange, 
    logger: LogErrorRepository
}

const makeSut = (): typeSut => {   
    const logger = new LoggerStub()
    const exchangeStub = new ExchangeStub()    
    const sut = new GetExchangeInfo(exchangeStub, logger)
    return { sut , exchangeStub, logger }
}

describe('Test ExchangeInfo', () => {
    test('Should call exchangeInfo method from exchange', async () => {
        const {sut, exchangeStub }  = makeSut()
        const exchangeInfoSpy = jest.spyOn(exchangeStub, 'getInfo')
        await sut.get()

        expect(exchangeInfoSpy).toBeCalled()         
    })

    test('Should ExchangeInfo return saved ExchangeInfo ', async () => {        
        const {sut, exchangeStub, logger }  = makeSut() 
        const exchangeInfoSpy = jest.spyOn(exchangeStub, 'getInfo')
        const exchangeInfoMock: ExchangeInfo = {
            timezone: 'string',
            serverTime: 0,
            rateLimits: [],
            exchangeFilters: [],
            symbols: []
        }         
        sut['exchangeInfoexists'] =  true
        sut['exchangeInfo'] = exchangeInfoMock
        const exchangeInfo = await sut.get()

        expect(exchangeInfoSpy).toBeCalledTimes(0)
        expect(exchangeInfo).toBe(exchangeInfoMock)
    })   

    test('Should ExchangeInfo log a error', async () => {        
        const {sut, exchangeStub, logger }  = makeSut() 
        const logSpy = jest.spyOn(logger, 'log')        
        jest
          .spyOn(exchangeStub, 'getInfo')
          .mockReturnValueOnce(Promise.reject(new Error()))        
        await sut.get()

        expect(logSpy).toBeCalled()
    })   
})