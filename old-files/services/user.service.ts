import DataBase from "../dataBase";
import User from "../models/user.model";

export default class UserService {
  private static db = new DataBase('banco');
  static async addUser(user: User) {
    await this.db.adicionar("users", user);
  }
}
