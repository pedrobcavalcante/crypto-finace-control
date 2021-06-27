import MongoLogRepository from "./mongo-repository-log"

const makeSut = () => {    
    return new MongoLogRepository()
}

describe('Log Usecase', () => {
    test('Should call log in Logger', async () => {   
        const sut = new MongoLogRepository()
        const logSpy = jest.spyOn(sut, 'log')
        await sut.log('')
        expect(logSpy).toBeCalled()
    })

    test('Should call log in Logger with correct value', async () => {        
        const sut = makeSut()
        const message = 'any_message'        
        const logSpy = jest.spyOn(sut, 'log')
        await sut.log(message)
        expect(logSpy).toBeCalledWith(message)
    })
})