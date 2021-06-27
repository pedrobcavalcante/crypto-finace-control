import Utils from "./trade_controller";

// var jaFezCompra: boolean = false;
async function main() {
  await setInicialData();
  while (true) {
    await Utils.atualizarValoresMoedas();

    await Utils.updateUserData();

    let compras = await Utils.verificarPossiveisTrasacoes(
      await Utils.moedasAcimaDoValorMinimo()
    );
    await Utils.comprar(compras);
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }
}
async function setInicialData() {
  await Utils.atualizarExchangerInfo();

  await Utils.atualizarValoresMoedas();

  await Utils.updateUserData();
}

main();
