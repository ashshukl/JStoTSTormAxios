"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsController = void 0;
const data_source_1 = require("../db/data-source");
const product_1 = require("../models/product");
const axios_1 = __importDefault(require("axios"));
class ProductsController {
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // res.send(await AppDataSource.manager.find(Product));
            // Making a GET request
            axios_1.default
                .get("https://axiosnode.free.beeceptor.com")
                .then(function (response) {
                console.log("5. Reached then.", "Response Data:", response.data);
                res.send(response.data);
            })
                .catch(function (error) {
                console.log("Error:", error);
                throw new Error(error);
            });
            //Other requests
            // axios.post(url: string, data?: any, config?: AxiosRequestConfig<any> | undefined): Promise<AxiosResponse<any, any>>
            // axios.delete(url: string, config?: AxiosRequestConfig<any> | undefined): Promise<AxiosResponse<any, any>>
        });
    }
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = new product_1.Product();
            product.name = req.body.name;
            product.price = req.body.price;
            product.save().then(() => {
                res.send(product);
            });
            //res.send(await AppDataSource.manager.save(product));
        });
    }
    static getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Recieved id = ${req.query.id}`);
            res.send(yield data_source_1.AppDataSource.getRepository(product_1.Product).findOne({
                where: {
                    id: req.query.id,
                },
            }));
        });
    }
}
exports.ProductsController = ProductsController;
//# sourceMappingURL=productsController.js.map