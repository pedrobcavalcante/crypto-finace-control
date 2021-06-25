import LogErrorRepository from "../../data/protocols/log-repository";

export default class MongoLogRepository implements LogErrorRepository{
    async log(message: string): Promise<void> {
        await Promise.resolve()
    }

}