// import { CarsRepositoryInMemory } from "../../../../modules/car/repositories/in-memory/CarsRepositoryInMemory";

import { AppError } from "../../../../shared/infra/errors/AppError";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./CreatecarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });
  it("Should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "name car",
      description: "description car",
      daily_rate: 100,
      licence_plate: "abc-1234",
      fine_amount: 60,
      brand: "brand",
      category_id: "category",
    });
    expect(car).toHaveProperty("id");
  });
  it("Should not be able to create a car with a existed licence plate", async () => {
    await createCarUseCase.execute({
      name: "car1",
      description: "description car",
      daily_rate: 100,
      licence_plate: "abc-1234",
      fine_amount: 60,
      brand: "brand",
      category_id: "category",
    });

    await expect(
      createCarUseCase.execute({
        name: "car2",
        description: "description car",
        daily_rate: 100,
        licence_plate: "abc-1234",
        fine_amount: 60,
        brand: "brand",
        category_id: "category",
      })
    ).rejects.toEqual(new AppError("Car already exists"));
  });

  it("Should be able to create a car with available true as default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car available",
      description: "description car",
      daily_rate: 100,
      licence_plate: "abcd-1234",
      fine_amount: 60,
      brand: "brand",
      category_id: "category",
    });
    expect(car.available).toBe(true);
  });
});
