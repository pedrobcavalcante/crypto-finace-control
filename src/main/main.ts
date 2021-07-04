import UserMock from "../data/repository/mocks/user-mock-repository";
import GetAllUser from "../data/usecases/db-get-user";

async function main() {
  //TODO: remover o UserMock
  let users = await new GetAllUser(new UserMock()).getAll({
    autoBalance: false,
  });
  console.log(users);
  //TODO: pegar o valor percentual de cada ativo do portifolio;
  //TODO: calcular a diferença percentual de cada ativo;
  //TODO: atualizar o preço médio de cada ativo;
  //TODO: realizar os ajustes necessários do portifólio;
}

main();
