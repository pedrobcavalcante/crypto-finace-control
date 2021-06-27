import SavePayloadRepository, { Payload } from "../../data/protocols/db-save-payload-repository";

export default class SavePayloadRepositoryStub implements SavePayloadRepository{
    save(payload: Payload): Promise<any> {
        return Promise.resolve()
    }
}