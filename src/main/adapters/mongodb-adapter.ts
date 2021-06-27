import { ListValue } from "../../../old-files/models/listValue.model";
import DataBaseInterface from "../../interfaces/DataBase.interface";

export default class MongoDB implements DataBaseInterface {
    adicionar(banco: string, data: object): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    criarBanco(nome: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    inserir(local: string, valor: any): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    procurarLista(where: string, value: any): Promise<ListValue> {
        throw new Error("Method not implemented.");
    }
    getValue(value: string): Promise<any> {
        throw new Error("Method not implemented.");
    }

}