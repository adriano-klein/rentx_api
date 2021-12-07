import { Specifications } from "../infra/typeorm/entities/Specifications";

interface ICreateCarDTO {
  name: string;
  description: string;
  daily_rate: number;
  licence_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
  specifications?: Specifications[];
  id?: string;
}

export { ICreateCarDTO };
