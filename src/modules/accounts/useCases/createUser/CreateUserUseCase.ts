import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

// import { ICreateUserDTO } from "../../../../modules/accounts/dtos/ICreateUserDTO";
// import { IUserRepository } from "../../../../modules/accounts/repositories/IUserRepository";
// import { AppError } from "@shared/infra/errors/AppError";

import { AppError } from "../../../../shared/infra/errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUserRepository } from "../../repositories/IUserRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUserRepository
  ) {}

  async execute({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError("User Already Exists");
    }

    const passwordHash = await hash(password, 8);

    await this.usersRepository.create({
      name,
      password: passwordHash,
      email,
      driver_license,
    });
  }
}

export { CreateUserUseCase };
