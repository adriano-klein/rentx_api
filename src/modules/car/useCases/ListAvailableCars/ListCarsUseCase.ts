// import { Car } from "../../../../modules/car/infra/typeorm/entities/Car";

// import { ICarsRespository } from "../../repositories/ICarsRepository";

// interface IRequest {
//   category_id?: string;
//   brand?: string;
//   name?: string;
// }

// class ListAvailableCarsUseCase {
//   constructor(private carsRepository: ICarsRespository) {}
//   async execute({ category_id, brand, name }: IRequest): Promise<Car[]> {
//     const cars = await this.carsRepository.findAvailable(
//       brand,
//       category_id,
//       name
//     );

//     return cars;
//   }
// }

// export { ListAvailableCarsUseCase };
