import express from "express";
import { ProductsController } from "../controllers/productsController";
import {
  ProductsMiddleware,
  ProductsCreateMiddleware,
} from "../middlewares/productsMiddleware";

export class ProductsRouter {
  router: express.Router;

  constructor() {
    this.router = express.Router();
    this.initRoutes();
  }

  // Initialises routes for the router
  initRoutes() {
    this.router.use(ProductsMiddleware);
    this.router.get("/", ProductsController.getAll);
    this.router.get("/byId", ProductsController.getById);
    this.router.post("/", ProductsCreateMiddleware, ProductsController.create);
  }
}
