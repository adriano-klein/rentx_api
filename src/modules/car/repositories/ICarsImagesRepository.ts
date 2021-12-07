import { CarImages } from "../infra/typeorm/entities/CarImages";

interface ICarsImagesRepository {
  create(car_id: string, image_name: string): Promise<CarImages>;
}

export { ICarsImagesRepository };
