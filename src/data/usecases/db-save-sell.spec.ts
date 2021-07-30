import LoggerStub from "../../domain/usecases/exchange/mocks/log.mock"
import SavePayloadRepositoryStub from "../../domain/usecases/exchange/mocks/save-payload-repository.mock"
import SavePayloadRepository, { ORDER_TYPE_SELL, Payload } from "../protocols/db-save-payload-repository"
import LogErrorRepository from "../protocols/log-repository"
import SaveSell from "./db-save-sell"

interface typeSut{
    sut: SaveSell,     
    logger: LogErrorRepository, 
    savePayloadRepositoryStub: SavePayloadRepository,
    params: Payload
}

const makeSut = (): typeSut => {      
    const params: Payload = {
        symbol: 'valid_symbol',
        payload: 'valid_payload'         
    }   
    
    const savePayloadRepositoryStub = new SavePayloadRepositoryStub()
    const logger = new LoggerStub()    
    const sut = new SaveSell(logger, savePayloadRepositoryStub)

    return { sut , logger, savePayloadRepositoryStub, params}
}

describe('Test SaveSell', () => {
    test('Should call method save from SaveSell', async () => {        
        const {sut, savePayloadRepositoryStub, params }  = makeSut()
        const saveSpy = jest.spyOn(savePayloadRepositoryStub, 'save')
        await sut.save(params)

        expect(saveSpy).toBeCalled()         
    })

    test('Should call SaveSell method save with correct values', async () => {        
        const {sut, savePayloadRepositoryStub, params }  = makeSut()
        const saveSpy = jest.spyOn(savePayloadRepositoryStub, 'save')
        await sut.save(params)

        const paylaod_with_order_type = Object.assign({}, params, { order_type: ORDER_TYPE_SELL })
        expect(saveSpy).toBeCalledWith(paylaod_with_order_type)
    })

    test('Should method save log a error', async () => {        
        const {sut, savePayloadRepositoryStub, logger, params }  = makeSut() 
        const logSpy = jest.spyOn(logger, 'log')
        jest
          .spyOn(savePayloadRepositoryStub, 'save')
          .mockReturnValueOnce(Promise.reject(new Error()))        
        await sut.save(params)

        expect(logSpy).toBeCalled()
    })   
})