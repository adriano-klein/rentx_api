import { getRepository, Repository } from "typeorm";

import {
  ICreateSpecificationDTO,
  ISpecificationRepository,
} from "../../../repositories/ISpecificationRepository";
import { Specifications } from "../entities/Specifications";

class SpecificationRepository implements ISpecificationRepository {
  private repository: Repository<Specifications>;

  constructor() {
    this.repository = getRepository(Specifications);
  }

  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specifications> {
    const specification = this.repository.create({
      description,
      name,
    });

    await this.repository.save(specification);

    return specification;
  }

  async findByBame(name: string): Promise<Specifications> {
    const specification = await this.repository.findOne({
      name,
    });
    return specification;
  }

  async findByIds(id: string[]): Promise<Specifications[]> {
    const specifications = await this.repository.findByIds(id);

    return specifications;
  }
}

export { SpecificationRepository };
