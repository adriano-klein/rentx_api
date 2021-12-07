// import { ICreateUserDTO } from "../../../../modules/accounts/dtos/ICreateUserDTO";
// import { AppError } from "@shared/infra/errors/AppError";

import { DayJsDateProvider } from "../../../../shared/infra/container/providers/dateProvider/implementations/DayJsDateProvider";
import { AppError } from "../../../../shared/infra/errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "../../repositories/in-memory/UsersTokensRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let dayJsProvider: DayJsDateProvider;
let userTokensRepositoryInMemory: UsersTokensRepositoryInMemory;

describe("Authenticate Users", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    userTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dayJsProvider = new DayJsDateProvider();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      userTokensRepositoryInMemory,
      dayJsProvider
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });
  it("should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      driver_license: "000123456",
      email: "user@test.com.br",
      password: "11223344",
      name: "Test Name",
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("Should not be able to authenticate a non existent user", async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: "email@email.com",
        password: "123456",
      })
    ).rejects.toEqual(new AppError("Incorrect e-mail or password"));
  });

  it("Should not be able to authenticate with a incorrect password", async () => {
    const user: ICreateUserDTO = {
      driver_license: "1234569",
      email: "user@testerror.com.br",
      password: "11223344",
      name: "Test Name",
    };

    await createUserUseCase.execute(user);

    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: "incorrectPassword",
      })
    ).rejects.toEqual(new AppError("Incorrect e-mail or password"));
  });
});
