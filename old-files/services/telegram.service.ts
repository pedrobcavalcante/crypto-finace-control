import DataBase from "../dataBase";
import ErrorLogs from "./error.service";

const TelegramBot = require("node-telegram-bot-api");

export default class Telegram {
  static errorLogs = new ErrorLogs(new DataBase("errors_log"));
  static bot = new TelegramBot(
    "chave secreta do telegram",
    { polling: true }
  );
  static sendMessage(mensagem: string) {
    try {
      this.bot.sendMessage(12345, mensagem);
    } catch (error) {
      this.errorLogs.saveError(error);
    }
  }
}
