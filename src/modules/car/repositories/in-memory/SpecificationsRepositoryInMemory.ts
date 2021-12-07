// import { Specifications } from "../../../../modules/car/infra/typeorm/entities/Specifications";
import { Specifications } from "../../infra/typeorm/entities/Specifications";
import {
  ICreateSpecificationDTO,
  ISpecificationRepository,
} from "../ISpecificationRepository";

class SpecificationsRepositoryInMemory implements ISpecificationRepository {
  specification: Specifications[] = [];

  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specifications> {
    const specification = new Specifications();

    Object.assign(specification, {
      description,
      name,
    });

    this.specification.push(specification);

    return specification;
  }
  async findByBame(name: string): Promise<Specifications> {
    return this.specification.find(
      (specification) => specification.name === name
    );
  }
  async findByIds(ids: string[]): Promise<Specifications[]> {
    const allSpecifications = this.specification.filter((specification) =>
      ids.includes(specification.id)
    );
    return allSpecifications;
  }
}

export { SpecificationsRepositoryInMemory };
