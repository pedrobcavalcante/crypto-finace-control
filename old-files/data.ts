import { BookTicker } from "./models/bookTicker.model";
import { ExchangeInfo } from "./models/exchangeInfo.model";
import { CoinList } from "./models/coinList.model";
import UserData from "./models/user.model";

export default class Data {
    private static instance: Data;
    exchangeInfo!: ExchangeInfo;
    exchangeData!: [string, BookTicker][];
    coinList: Array<CoinList> = [];
    userData!: UserData;
    private constructor() {
    }
    static getInstance(): Data {
        this.instance = this.instance ? this.instance : new Data();
        return this.instance;
    }

}
