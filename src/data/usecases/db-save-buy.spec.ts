import LoggerStub from "../../exchange/mocks/log.mock"
import SavePayloadRepositoryStub from "../../exchange/mocks/save-payload-repository.mock"
import SavePayloadRepository, { ORDER_TYPE_BUY, Payload } from "../protocols/db-save-payload-repository"
import LogErrorRepository from "../protocols/log-repository"
import SaveBuy from "./db-save-buy"

interface typeSut{
    sut: SaveBuy,     
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
    const sut = new SaveBuy(logger, savePayloadRepositoryStub)

    return { sut , logger, savePayloadRepositoryStub, params}
}

describe('Test SaveBuy', () => {
    test('Should call method save from SaveBuy', async () => {        
        const {sut, savePayloadRepositoryStub, params }  = makeSut()
        const saveSpy = jest.spyOn(savePayloadRepositoryStub, 'save')
        await sut.save(params)

        expect(saveSpy).toBeCalled()         
    })

    test('Should call SaveBuy method save with correct values', async () => {        
        const {sut, savePayloadRepositoryStub, params }  = makeSut()
        const saveSpy = jest.spyOn(savePayloadRepositoryStub, 'save')
        await sut.save(params)

        const paylaod_with_order_type = Object.assign({}, params, { order_type: ORDER_TYPE_BUY })
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