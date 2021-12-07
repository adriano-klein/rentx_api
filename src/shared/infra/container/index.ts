import { container } from "tsyringe";

import "./providers";

import { UserRepository } from "../../../modules/accounts/infra/typeorm/repositories/UserRepository";
import { UsersTokensRepository } from "../../../modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import { ICarsRepository } from "../../../modules/accounts/repositories/ICarsRepository";
import { IUserRepository } from "../../../modules/accounts/repositories/IUserRepository";
import { IUserTokensRepository } from "../../../modules/accounts/repositories/IUserTokensRepository";
import { CarsImagesRepository } from "../../../modules/car/infra/typeorm/repositories/CarsImagesRepository";
import { CarsRepository } from "../../../modules/car/infra/typeorm/repositories/CarsRepository";
import { CategoriesRepository } from "../../../modules/car/infra/typeorm/repositories/CategoriesRepository";
import { SpecificationRepository } from "../../../modules/car/infra/typeorm/repositories/SpecificationRepository";
import { ICarsImagesRepository } from "../../../modules/car/repositories/ICarsImagesRepository";
import { ICategoryRepository } from "../../../modules/car/repositories/ICategoryRespository";
import { ISpecificationRepository } from "../../../modules/car/repositories/ISpecificationRepository";
import { RentalsRepository } from "../../../modules/rentals/infra/typeorm/repositories/RentalsRepository";
import { IRentalsRepository } from "../../../modules/rentals/repositories/IRentalsRepository";

container.registerSingleton<ICategoryRepository>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<ISpecificationRepository>(
  "SpecificationRepository",
  SpecificationRepository
);

container.registerSingleton<IUserRepository>("UsersRepository", UserRepository);

container.registerSingleton<ICarsRepository>("CarsRepository", CarsRepository);
container.registerSingleton<ICarsImagesRepository>(
  "CarsImagesRepository",
  CarsImagesRepository
);

container.registerSingleton<IRentalsRepository>(
  "RentalsRepository",
  RentalsRepository
);

container.registerSingleton<IUserTokensRepository>(
  "UsersTokensRepository",
  UsersTokensRepository
);
