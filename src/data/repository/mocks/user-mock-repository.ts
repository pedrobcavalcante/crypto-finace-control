import User from "../../../domain/entity/user";
import UserConfig from "../../../domain/entity/user-config";
import DataBaseRepository, { Params } from "../data-base-reppository";

export default class UserMock implements DataBaseRepository {
    async getAll<T>(params: Params): Promise<any> {
      //TODO:Fazer um banco de dados local com LowDB
    return  [
      new User("user1", new UserConfig()),
      new User("user2", new UserConfig()),
    ];
  }
}
