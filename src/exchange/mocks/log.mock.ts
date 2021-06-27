import LogErrorRepository from "../../data/protocols/log-repository";

export default class LoggerStub implements LogErrorRepository{
    log(message: any): Promise<void> {
        return Promise.resolve()
    }        
}