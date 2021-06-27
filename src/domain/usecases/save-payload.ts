import { Payload } from "../../data/protocols/db-save-payload-repository";

export interface SavePayload{
    save(payload: Payload): Promise<void>
}