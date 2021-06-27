import lowdb from "lowdb";
import FileSync = require("lowdb/adapters/FileSync");
import DataBaseInterface from "./interfaces/DataBase.interface";
import { ListValue } from "./models/listValue.model";

export default class DataBase implements DataBaseInterface {

  private dbfile: string;
  private adapter: lowdb.AdapterSync<any>;
  private database: lowdb.LowdbSync<any>;
  constructor(dbName: String) {
    this.dbfile = `./src/assets/${dbName}.json`;
    this.adapter = new FileSync(this.dbfile);
    this.database = lowdb(this.adapter);
  }
  async adicionar(banco: string, data: object): Promise<boolean> {
    try {
      let dbb: any = this.database.get(banco);
      await dbb.push(data).write();
      return true;
    } catch (error) {
      return false;
    }
  }
  async criarBanco(nome: string) {
    await this.database
      .defaults({
        [nome]: [],
      })
      .write();
  }
  async inserir(local: string, valor: any): Promise<boolean> {
    try {
      await this.database.get(local).value();
      let db = this.database.set(local, valor);
      await db.write();
      return true;
    } catch (error) {
      return false;
    }
  }
  async procurarLista(where: string, value: any): Promise<ListValue> {
    let res: any = {};
    try {
      res.index = this.database.get(where).findKey(value).value();
      let list: [] = this.database.get(where).value();
      res.value = list[res.index];
      return res;
    } catch (error) {
      return res;
    }
  }
  async getValue(value: string): Promise<any> {
    try {
      let res = await this.database.get(value).value();
      return await JSON.parse(JSON.stringify(res));
    } catch (error) {
      return error;
    }
  }
}
