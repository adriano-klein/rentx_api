import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Category } from "./Category";
import { Specifications } from "./Specifications";

@Entity("cars")
class Car {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  daily_rate: number;

  @Column()
  available: boolean;

  @Column()
  licence_plate: string;

  @Column()
  fine_amount: number;

  @Column()
  brand: string;

  @ManyToMany(() => Specifications)
  @JoinTable({
    name: "specifications_cars", // nome da tabela que já foi criada na migration
    joinColumns: [{ name: "car_id" }], // pegar da tabela specification_cars qual a coluna que pertence a tabela de carros
    inverseJoinColumns: [{ name: "specification_id" }], // nome da coluna que pertence a tabela de specification
  })
  specifications: Specifications[];

  @ManyToOne(() => Category)
  @JoinColumn({ name: "category_id" })
  category: Category;

  @Column()
  category_id: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
      this.available = true;
    }
  }
}

export { Car };
