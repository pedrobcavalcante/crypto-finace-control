import DataBase from "./dataBase";
import ErrorLogs from "./services/error.service";
import { BookTicker } from "./models/bookTicker.model";
import { BookTickers } from "./models/bookTickers.model";
import { ExchangeInfo } from "./models/exchangeInfo.model";
import Utils from "./trade_controller";

export default class Binance {
 errorLogs = new ErrorLogs(new DataBase("errors_log"));
  b = require("node-binance-api");
  binance: any;
  private exchangeInfo!: ExchangeInfo;
  private exchangeInfoexists = false;
  constructor(apiKey?: string, apiSecret?: string) {
    this.binance = new this.b().options({
      APIKEY: apiKey || "",
      APISECRET: apiSecret || "",
    });
  }
  async getExchangeInfo(): Promise<ExchangeInfo> {
    if (this.exchangeInfoexists) {
      return this.exchangeInfo;
    } else {
      this.exchangeInfo = await this.binance.exchangeInfo();
      return this.exchangeInfo;
    }
  }

  async buy(pair: string, quantity: number, price?: number) {
    quantity = await Utils.setQuantity(quantity, pair);
    try {
      if (price == undefined) await this.binance.marketBuy(pair, quantity);
      else await this.binance.buy(pair, quantity, price);
    } catch (error) {
      this.errorLogs.saveError(error);
      console.log(error);
    }
  }
  async sell(pair: string, quantity: number, price?: number) {
    quantity = await Utils.setQuantity(quantity, pair);
    try {
      if (price == undefined) await this.binance.marketSell(pair, quantity);
      else await this.binance.sell(pair, quantity, price);
    } catch (error) {
      
      this.errorLogs.saveError(error);
      console.log(error);
    }
  }

  async bookTickers(): Promise<Array<[string, BookTicker]>> {
    let res: any;
    res = await this.binance.bookTickers();
    // var result = Object.keys(res).map((key) => [Number(key), res[key]]);
    let result: Array<[string, BookTicker]> = Object.entries(res);
    return result;
  }
  async userBalance(): Promise<
    Array<[string, { available: string; onOrder: string }]>
  > {
    // this.binance.userMarginData();
    await this.binance.useServerTime();
    try {
      let res = await this.binance.balance();
      let result: Array<[string, any]> = Object.entries(res);
      let final: any[] = [];
      result.forEach((value) => {
        if (Number(value[1].available) + Number(value[1].onOrder) > 0) {
          final.push(value);
        }
      });
      return final;
    } catch (error) {
      this.errorLogs.saveError(error);
      return error;
    }
  }
  async allCoinValue(coinBase: string): Promise<Array<BookTickers>> {
    let coinListTickers: BookTickers[] = [];
    try {
      let exchangeInfo = await this.getExchangeInfo();
      exchangeInfo.symbols.forEach((value) => {
        if (!coinListTickers.some((x) => x.symbol == value.baseAsset)) {
          coinListTickers.push({ symbol: value.baseAsset });
        }
        if (!coinListTickers.some((x) => x.symbol == value.quoteAsset)) {
          coinListTickers.push({ symbol: value.quoteAsset });
        }
      });
      const data = await this.bookTickers();
      coinListTickers.forEach((value, index) => {
        if (data.some((x) => x[0] == value.symbol + coinBase)) {
          let asd =
            data[data.findIndex((x) => x[0] == value.symbol + coinBase)][1];
          coinListTickers[index].bestBid = asd.bid;
          coinListTickers[index].bestAsk = asd.ask;
        } else {
          //TODO: implementar o retorno com o valor das moedas que não tem compra direta com a paridade selecionada.
        }
      });
    } catch (error) {
      this.errorLogs.saveError(error);
      console.log(error);
    }
    return coinListTickers;
  }
}
