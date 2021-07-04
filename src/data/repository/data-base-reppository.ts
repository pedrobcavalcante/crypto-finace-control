import User from "../../domain/entity/user";

export class Params {
    //TODO: implementar o resto dos parametros;

    constructor( autoBalance: boolean = false ) { }
}
export default interface DataBaseRepository {
    getAll<T>(params: Params): Promise<T>;
}
