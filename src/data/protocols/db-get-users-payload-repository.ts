import User from "../../domain/entity/user";

export interface Settings {
  autoBalance?: boolean;
}

export default interface GetUserRepository {
  getAll(settings: Settings): Promise<User[]>;
}
