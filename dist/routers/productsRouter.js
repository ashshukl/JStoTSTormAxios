"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsRouter = void 0;
const express_1 = __importDefault(require("express"));
const productsController_1 = require("../controllers/productsController");
const productsMiddleware_1 = require("../middlewares/productsMiddleware");
class ProductsRouter {
    constructor() {
        this.router = express_1.default.Router();
        this.initRoutes();
    }
    // Initialises routes for the router
    initRoutes() {
        this.router.use(productsMiddleware_1.ProductsMiddleware);
        this.router.get("/", productsController_1.ProductsController.getAll);
        this.router.get("/byId", productsController_1.ProductsController.getById);
        this.router.post("/", productsMiddleware_1.ProductsCreateMiddleware, productsController_1.ProductsController.create);
    }
}
exports.ProductsRouter = ProductsRouter;
//# sourceMappingURL=productsRouter.js.map