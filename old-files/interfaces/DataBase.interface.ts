import { ListValue } from "../models/listValue.model";

export default interface DataBaseInterface {
  adicionar(banco: string, data: object): Promise<boolean>;
  criarBanco(nome: string): Promise<void>;
  inserir(local: string, valor: any): Promise<boolean>;
  procurarLista(where: string, value: any): Promise<ListValue>;
  getValue(value: string): Promise<any>;
}
