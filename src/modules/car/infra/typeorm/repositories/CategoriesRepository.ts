import { getRepository, Repository } from "typeorm";

import {
  ICategoryRepository,
  ICreateCategoryDTO,
} from "../../../repositories/ICategoryRespository";
import { Category } from "../entities/Category";

class CategoriesRepository implements ICategoryRepository {
  private repository: Repository<Category>;
  // Aqui o Repository vem de dentro do typeorm

  // colocar o private na frente para que não seja possível mais usar instanciar
  constructor() {
    this.repository = getRepository(Category);
    // O getRepository vem de dentro do typeorm e passamos a entidade pra dentro dele
  }

  async create({ description, name }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      description,
      name,
    });
    await this.repository.save(category);
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();
    return categories;
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.repository.findOne({ name });
    return category;
  }
}

export { CategoriesRepository };
