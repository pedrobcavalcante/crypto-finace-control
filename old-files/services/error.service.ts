import DataBase from "../dataBase";
import DataBaseInterface from "../interfaces/DataBase.interface";
export default class ErrorLogsService {
  private db: DataBaseInterface;
  constructor(db: DataBaseInterface) {
    this.db = db;
    this.verificarSeBancoExiste();
  }
  // TODO: ajustar essa função para faze-la corretamente;
  private async verificarSeBancoExiste() {
    await this.db.criarBanco("errors");
  }

  async saveError(error: any) {
    await this.verificarSeBancoExiste();
    await this.db.adicionar("errors", error);
  }
}

export class ErrorLogs extends ErrorLogsService {
  constructor() {
    super(new DataBase("errors_log"));
  }
}
