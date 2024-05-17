import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Entity("product")
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name?: string;

  @Column()
  price?: number;
}
