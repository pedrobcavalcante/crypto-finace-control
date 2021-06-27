import { Symbol } from "./symbol.model";
import { cryptoUserData, UserKeys } from "./user.model";

export default class Compra {
  constructor() {}
  origem!: cryptoUserData;
  saida!: cryptoUserData;
  total!: number;
  paridade!: Symbol;
  operacao!: string;
  userKeys!: UserKeys;
}
