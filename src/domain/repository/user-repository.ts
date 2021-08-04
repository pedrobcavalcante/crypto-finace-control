import Exchange from "../../data/interfaces/exchange.interface";
import UserPortfolio from "../entities/user-portfolio.entitie";

export default class UserRepository {
    constructor(private readonly exchange: Exchange ) { }
    async getUserPortifolio(userKey: String, userSecret: String): Promise<UserPortfolio>{
       return await this.exchange.getUserPortfolio(userKey, userSecret);
    }
}
