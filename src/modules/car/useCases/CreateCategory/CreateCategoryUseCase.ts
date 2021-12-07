import { inject, injectable } from "tsyringe";

// import { ICategoryRepository } from "../../../../modules/car/repositories/ICategoryRespository";
// import { AppError } from "@shared/infra/errors/AppError";

import { AppError } from "../../../../shared/infra/errors/AppError";
import { ICategoryRepository } from "../../repositories/ICategoryRespository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRespositories: ICategoryRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRespositories.findByName(
      name
    );

    if (categoryAlreadyExists) {
      throw new AppError("Category already exists");
    }

    await this.categoriesRespositories.create({ name, description });
  }
}

export { CreateCategoryUseCase };
