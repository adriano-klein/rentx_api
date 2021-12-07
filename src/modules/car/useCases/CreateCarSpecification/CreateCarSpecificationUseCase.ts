import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/infra/errors/AppError";
import { Car } from "../../infra/typeorm/entities/Car";
// import { SpecificationRepository } from "../../../../modules/car/infra/typeorm/repositories/SpecificationRepository";
// import { ICarsRespository } from "../../../../modules/car/repositories/ICarsRepository";
// import { ISpecificationRepository } from "../../../../modules/car/repositories/ISpecificationRepository";
// import { AppError } from "@shared/infra/errors/AppError";

import { ICarsRepository } from "../../repositories/ICarsRepository";
import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("SpecificationRepository")
    private specificationRepository: ISpecificationRepository
  ) {}

  async execute({ car_id, specifications_id }: IRequest): Promise<Car> {
    const carExists = await this.carsRepository.findById(car_id);

    if (!carExists) {
      throw new AppError("Cars does not exists");
    }

    const specifications = await this.specificationRepository.findByIds(
      specifications_id
    );

    carExists.specifications = specifications;

    await this.carsRepository.create(carExists);

    return carExists;
  }
}

export { CreateCarSpecificationUseCase };
