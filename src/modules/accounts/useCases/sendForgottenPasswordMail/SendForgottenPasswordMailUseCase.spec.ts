import { DayJsDateProvider } from "../../../../shared/infra/container/providers/dateProvider/implementations/DayJsDateProvider";
import { MailProviderInMemory } from "../../../../shared/infra/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "../../../../shared/infra/errors/AppError";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "../../repositories/in-memory/UsersTokensRepositoryInMemory";
import { SendForgottenPasswordMailUseCase } from "./SendForgottenPasswordMailUseCase";

let sendForgottenPasswordMailUseCase: SendForgottenPasswordMailUseCase;
let userRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayJsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe("Send Forgot Mail", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    mailProvider = new MailProviderInMemory();
    dateProvider = new DayJsDateProvider();
    sendForgottenPasswordMailUseCase = new SendForgottenPasswordMailUseCase(
      userRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it("Should be able to send a forgot password mail to user", async () => {
    const sendMail = spyOn(mailProvider, "sendMail");

    await userRepositoryInMemory.create({
      driver_license: "404670",
      email: "to@wad.vn",
      name: "Jay McKinney",
      password: "1312163111",
    });
    await sendForgottenPasswordMailUseCase.execute("to@wad.vn");

    expect(sendMail).toHaveBeenCalled();
  });

  it("Should not be able to send an email if user does not exists", async () => {
    await expect(
      sendForgottenPasswordMailUseCase.execute("lur@so.kz")
    ).rejects.toEqual(new AppError("User not found"));
  });

  it("Should be able to create an user token", async () => {
    const generateTokenMail = spyOn(usersTokensRepositoryInMemory, "create");

    userRepositoryInMemory.create({
      name: "Wesley Bryan",
      email: "zizepfu@zewip.ki",
      password: "805825862",
      driver_license: "150475",
    });

    await sendForgottenPasswordMailUseCase.execute("zizepfu@zewip.ki");

    expect(generateTokenMail).toBeCalled();
  });
});
