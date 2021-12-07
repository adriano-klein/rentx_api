import { resolve } from "path";
import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from "uuid";

import { IDateProvider } from "../../../../shared/infra/container/providers/dateProvider/IDateProvider";
import { IMailProvider } from "../../../../shared/infra/container/providers/MailProvider/IMailProvider";
import { AppError } from "../../../../shared/infra/errors/AppError";
import { IUserRepository } from "../../repositories/IUserRepository";
import { IUserTokensRepository } from "../../repositories/IUserTokensRepository";

@injectable()
class SendForgottenPasswordMailUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUserRepository,
    @inject("UsersTokensRepository")
    private userTokensRepository: IUserTokensRepository,
    @inject("DayJsDateProvider")
    private dateProvider: IDateProvider,
    @inject("MailProvider")
    private mailProvider: IMailProvider
  ) {}
  async execute(email: string) {
    const user = await this.usersRepository.findByEmail(email);
    const templatePath = resolve(
      __dirname,
      "..",
      "..",
      "views",
      "emails",
      "forgottenPassword.hbs"
    );

    if (!user) {
      throw new AppError("User not found");
    }

    const token = uuidV4();

    const expires_date = this.dateProvider.addHours(3);
    await this.userTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date,
    });

    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_MAIL_URL}${token}`,
    };

    await this.mailProvider.sendMail(
      email,
      "Recuperação de senha",
      variables,
      templatePath
    );
  }
}

export { SendForgottenPasswordMailUseCase };
