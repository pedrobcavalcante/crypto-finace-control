import LogErrorRepository from "../../data/protocols/log-repository";

export const makeTxtLogger = (): LogErrorRepository => {
    class Logger implements LogErrorRepository {
        async log(message: any){
            return Promise.resolve(console.log(message))
        }
    }

    return new Logger()

}