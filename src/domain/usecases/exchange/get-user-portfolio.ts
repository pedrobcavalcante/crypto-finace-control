import UserPortfolio from "../../entities/user-portfolio.entitie";
import UserRepository from "../../repository/user-repository";


export default class GetUserPortfolio {
    constructor(
        private readonly userRepository: UserRepository
    ) { }

    execute(userKey:String, userSecret: String): Promise<UserPortfolio> {
        return this.userRepository.getUserPortifolio(userKey,userSecret);
    }
}