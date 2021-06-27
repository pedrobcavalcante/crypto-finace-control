import Binance from "./binance";
import DataBase from "./dataBase";
import Compra from "./models/compra.model";
import Telegram from "./services/telegram.service";
import { Symbol } from "./models/symbol.model";
import User, { cryptoUserData } from "./models/user.model";
import { ExchangeInfo } from "./models/exchangeInfo.model";
import ErrorLogs from "./services/error.service";
let binance = new Binance("", "");

const db = new DataBase("banco");

export default class TradeController {
  private static errorLogs = new ErrorLogs(new DataBase("errors_log"));
  static async atualizarExchangerInfo() {
    await db.inserir("data.ExchangeInfo", await binance.getExchangeInfo());
  }
  static async moedasAcimaDoValorMinimo(): Promise<User[]> {
    let listaDeUsuarios: User[] = await db.getValue("users");
    let usariosComPossibilidadesdeTransacoes: User[] = [];
    for (let usuario of listaDeUsuarios) {
      let moedasAcimaDosValores: cryptoUserData[] = [];
      usuario.cryptoUserData.forEach((cryptoUserData) => {
        let minPercentOftotalOfUsdt = usuario.UserData.totalOfUsdt * 0.01;
        let diference = 10;
        if (minPercentOftotalOfUsdt > 10) {
          diference = minPercentOftotalOfUsdt;
        }
        if (
          cryptoUserData.diference! > diference ||
          cryptoUserData.diference! < -diference
        ) {
          moedasAcimaDosValores.push(cryptoUserData);
        } else if (cryptoUserData.coin == "USDT")
          moedasAcimaDosValores.push(cryptoUserData);
      });
      usuario.cryptoUserData = moedasAcimaDosValores;
      usariosComPossibilidadesdeTransacoes.push(usuario);
    }

    return usariosComPossibilidadesdeTransacoes;
  }

  static async verificarPossiveisTrasacoes(
    usuarios: User[]
  ): Promise<Compra[][]> {
    let exchangerInfoSymbols: Symbol[] = await db.getValue(
      "data.ExchangeInfo.symbols"
    );
    exchangerInfoSymbols = exchangerInfoSymbols.filter((x) => {
      return x.quoteAsset == "USDT";
    });
    let res: Compra[][] = [];
    usuarios.forEach((usuario) => {
      const usdtData = usuario.cryptoUserData.find((x) => {
        return x.coin == "USDT";
      });

      let compras: Compra[] = [];
      for (let cryptoUserData of usuario.cryptoUserData) {
        if (cryptoUserData.coin != "USDT") {
          let compra: Compra = new Compra();
          compra.origem = cryptoUserData;
          compra.userKeys = usuario.userKeys;
          compra.paridade = exchangerInfoSymbols.find((x) => {
            return x.baseAsset == cryptoUserData.coin;
          })!;
          compra.saida = usdtData!;
          if (cryptoUserData.diference! > 0) {
            compra.operacao = "compra";
          } else compra.operacao = "venda";
          compras.push(compra);
        }
      }
      res.push(compras);
    });

    return res;
  }
  static async atualizarValoresMoedas() {
    let bookTickers = await binance.bookTickers();
    let exchangerInfoSymbols: Symbol[] = await db.getValue(
      "data.ExchangeInfo.symbols"
    );
    for (let exchangerInfoSymbol of exchangerInfoSymbols) {
      try {
        for (let bookTicker of bookTickers) {
          if (exchangerInfoSymbol.symbol == bookTicker[0]) {
            exchangerInfoSymbol.bookTicker = bookTicker[1];
            break;
          }
        }
      } catch (error) {
        this.errorLogs.saveError(error);
      }
    }
    const value = await db.inserir(
      "data.ExchangeInfo.symbols",
      exchangerInfoSymbols
    );
    return value;
  }

  static async updateUserData() {
    let SymbolValues: Symbol[] = await db.getValue("data.ExchangeInfo.symbols");
    let usuarios: User[] = await db.getValue("users");
    for (let usuario of usuarios) {
      let UserBalance = await new Binance(
        usuario.userKeys.apiKey,
        usuario.userKeys.secretKey
      ).userBalance();
      let totalofPoints = this.setTotalofPoints(usuario);
      this.setCryptoUserData(usuario, totalofPoints);
      await this.setUserBalance(usuario, UserBalance);
      await this.setUserCoinValue(usuario, SymbolValues);
      this.setTotalUsdt(usuario);
      this.setDiference(usuario);
    }
    db.inserir("users", usuarios);
  }
  private static setDiference(usuario: User) {
    for (let cryptoUserData of usuario.cryptoUserData) {
      cryptoUserData.wishTotal =
        cryptoUserData.wishPercent! * usuario.UserData.wishTotalOfUsdt; // mudar aqui caso queira o valor total ou um valor simulado totalOfUsdt ou wishTotalOfUsdt
      cryptoUserData.percent =
        cryptoUserData.totalinUsdt! / usuario.UserData.totalOfUsdt;
      cryptoUserData.diference =
        cryptoUserData.wishTotal - cryptoUserData.totalinUsdt!;
    }
  }
  private static setTotalUsdt(usuario: User): number {
    let totalOfUsdt = 0;
    for (let cryptoUserData of usuario.cryptoUserData) {
      if (cryptoUserData.totalinUsdt! > 0)
        totalOfUsdt += cryptoUserData.totalinUsdt!;
    }
    usuario.UserData.totalOfUsdt = totalOfUsdt;
    return totalOfUsdt;
  }
  private static async setUserCoinValue(usuario: User, SymbolValues: Symbol[]) {
    for (let cryptoUserData of usuario.cryptoUserData) {
      for (let SymbolValue of SymbolValues) {
        if (
          cryptoUserData.coin == SymbolValue.baseAsset &&
          "USDT" == SymbolValue.quoteAsset
        ) {
          cryptoUserData.bookTicker = SymbolValue.bookTicker;
        } else if (
          cryptoUserData.coin == "USDT" &&
          SymbolValue.baseAsset == "USDT" &&
          SymbolValue.quoteAsset == "BRL"
        ) {
          cryptoUserData.bookTicker = SymbolValue.bookTicker;
        }
      }
      if (cryptoUserData.coin == "USDT") {
        cryptoUserData.totalinUsdt = cryptoUserData.totalofCoin;
      } else {
        cryptoUserData.totalinUsdt =
          cryptoUserData.totalofCoin! * Number(cryptoUserData.bookTicker?.bid);
      }
    }
  }
  private static async setUserBalance(
    usuario: User,
    UserBalance: Array<[string, { available: string; onOrder: string }]>
  ): Promise<Array<[string, { available: string; onOrder: string }]>> {
    for (let balance of UserBalance) {
      if (
        !usuario.cryptoUserData.some((x) => {
          return x.coin == balance[0];
        }) &&
        (Number(balance[1].available) > 0 || Number(balance[1].onOrder) > 0)
      ) {
        usuario.cryptoUserData.push({ coin: balance[0], points: 0 });
      }
      for (let cryptoUserData of usuario.cryptoUserData) {
        if (balance[0] == cryptoUserData.coin) {
          cryptoUserData.onOrder = Number(balance[1].onOrder);
          cryptoUserData.available = Number(balance[1].available);
          cryptoUserData.totalofCoin =
            cryptoUserData.onOrder + cryptoUserData.available;
          break;
        }
      }
    }
    return UserBalance;
  }

  private static setTotalofPoints(value: User): number {
    let totalofPoints: number = 0;
    value.cryptoUserData.forEach((element: any) => {
      totalofPoints += element.points;
    });
    value.UserData.totalofPoints = totalofPoints;
    return totalofPoints;
  }
  private static setCryptoUserData(value: User, totalofPoints: number) {
    value.cryptoUserData.forEach((element) => {
      element.wishPercent = element.points! / totalofPoints;
    });
  }
  static async comprar(compras: Compra[][]): Promise<boolean> {
    let jaFezCompra = false;
    for (let compra of compras) {
      for (let value of compra) {
        // if (value.operacao == "venda") {
        //   let mensagem = `${value.operacao} de ${Math.abs(
        //     value.origem.diference!
        //   )} de ${value.origem.coin} com ${value.saida.coin}`;
        //   let binance = new Binance(
        //     value.userKeys.apiKey,
        //     value.userKeys.secretKey
        //   );
        //   await binance.sell(
        //     value.paridade.symbol,
        //     Math.abs(value.origem.diference!) /
        //       Number(value.origem.bookTicker!.ask)
        //   );
        //   console.log(mensagem);
        //   Telegram.sendMessage(mensagem);
        // } 
        if (value.operacao == "compra") {
          let total: number =
            Math.abs(value.origem.diference!) >
            Math.abs(value.saida.totalinUsdt!)
              ? Math.abs(value.saida.totalinUsdt!)
              : Math.abs(value.origem.diference!);
          let mensagem = `${value.operacao} de ${total} de ${value.origem.coin} com ${value.saida.coin}`;
          let binance = new Binance(
            value.userKeys.apiKey,
            value.userKeys.secretKey
          );
          await binance.buy(
            value.paridade.symbol,
            total / Number(value.origem.bookTicker!.ask)
          );
          console.log(mensagem);
          Telegram.sendMessage(mensagem);
        }

        jaFezCompra = true;
      }
    }
    return jaFezCompra;
  }

  static async setQuantity(quantity: number, pair: string): Promise<number> {
    let minQty = 0;
    let exchangeInfo: ExchangeInfo = await db.getValue("data.ExchangeInfo");
    for (let symbol of exchangeInfo.symbols) {
      if (symbol.symbol == pair) {
        let filter = symbol.filters.find((x) => x.filterType === "LOT_SIZE");
        if (filter) {
          minQty = Number(filter.minQty!);
        }
        break;
      }
    }
    let numberOfHouses = 0;
    while (minQty < 1) {
      minQty = minQty * 10;
      numberOfHouses++;
    }
    let res = Number(quantity.toFixed(numberOfHouses));
    return res;
  }
}
