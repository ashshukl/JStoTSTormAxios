import { DataSource } from "typeorm";
import { Product } from "../models/product";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  database: "typeormdb",
  username: "sa",
  password: "rootSa@123",
  synchronize: true,
  logging: false,
  entities: [Product],
  subscribers: [],
  migrations: [],
});
