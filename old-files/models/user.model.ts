import { BookTicker } from "./bookTicker.model";

export default interface User {
  id: number;
  userKeys: UserKeys;
  cryptoUserData: cryptoUserData[];
  UserData: UserData;
}
export interface UserData {
  totalofPoints: number;
  totalOfUsdt: number;
  wishTotalOfUsdt: number;
}
export interface UserKeys {
  apiKey: string;
  secretKey: string;
}
export interface cryptoUserData {
  coin?: string;
  bookTicker?: BookTicker;
  wishPercent?: number;
  wishTotal?: number;
  totalofCoin?: number;
  totalinUsdt?: number;
  percent?: number;
  points?: number;
  available?: number;
  onOrder?: number;
  diference?: number;
}
