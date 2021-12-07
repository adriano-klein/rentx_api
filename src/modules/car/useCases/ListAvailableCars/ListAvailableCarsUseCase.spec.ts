// import { CarsRepositoryInMemory } from "../../../../modules/car/repositories/in-memory/CarsRepositoryInMemory";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it("Should be able to list available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      brand: "Audi",
      category_id: "1ace80b0-1494-42f0-afff-b894101e1cf8",
      daily_rate: 140,
      description: "Carro legal",
      fine_amount: 140,
      name: "Audi A3",
      licence_plate: "ABCe-123",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("Should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      brand: "AudiTT",
      category_id: "1ace80b0-1494-42f0-afff-b894101e1cf8",
      daily_rate: 140,
      description: "Carro legal",
      fine_amount: 140,
      licence_plate: "ABCe-123",
      name: "Audi A3",
    });
    const cars = await listAvailableCarsUseCase.execute({
      brand: "AudiTT",
    });

    expect(cars).toEqual([car]);
  });

  it("Should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      brand: "Ferrari",
      category_id: "1ace80b0-1494-42f0-afff-b894101e1cf8",
      daily_rate: 140,
      description: "Carro legal",
      fine_amount: 140,
      licence_plate: "ABC-12345",
      name: "Enzo",
    });
    const cars = await listAvailableCarsUseCase.execute({
      name: "Enzo",
    });

    expect(cars).toEqual([car]);
  });

  it("Should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      brand: "Ferrari",
      category_id: "12345",
      daily_rate: 140,
      description: "Carro legal",
      fine_amount: 140,
      licence_plate: "ABC-12345",
      name: "123456",
    });
    const cars = await listAvailableCarsUseCase.execute({
      category_id: "12345",
    });

    expect(cars).toEqual([car]);
  });
});
