import User from "../../domain/entity/user";
import GetUserRepository, { Settings } from "../protocols/db-get-users-payload-repository";
import DataBaseRepository, { Params } from "../repository/data-base-reppository";

export default class GetAllUser implements GetUserRepository {

  constructor(private database:DataBaseRepository) { }

  async getAll(settings: Settings): Promise<User[]> {
    
  return await this.database.getAll(new Params());
  }

}