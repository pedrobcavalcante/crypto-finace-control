import LogErrorRepository from "../../data/protocols/log-repository";

export default class MongoLogRepository implements LogErrorRepository{
    async log(message: string): Promise<void> {
        //TODO colocar o mongohelper aqui tipo MontoHelper.insertOne(.....)
        await Promise.resolve()
    }

}