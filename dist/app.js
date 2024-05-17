"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const productsRouter_1 = require("./routers/productsRouter");
const appMiddleware_1 = require("./middlewares/appMiddleware");
const data_source_1 = require("./db/data-source");
const axios_1 = __importDefault(require("axios"));
//Important to import this in app.ts file
require("reflect-metadata");
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.configMiddleware();
        this.setupRouters();
        this.configAxiosInterceptors();
    }
    //This method configures axios interceptors
    configAxiosInterceptors() {
        // Request interceptor
        axios_1.default.interceptors.request.use((config) => {
            console.log("3. Request intercepted by Axios-Request-Interceptor");
            // Add custom headers to the request config
            // config.headers["access-token"] = "AmazingAccessToken";
            // config.headers["CustomHeader"] = "CustomValue";
            return config;
        }, (error) => {
            console.log("Request interceptor encountered error");
            return Promise.reject(error);
        });
        // Response interceptor
        axios_1.default.interceptors.response.use((response) => {
            // Do something with response data
            console.log("4. Request intercepted by Axios-Response-Interceptor");
            return response;
        }, (error) => {
            // Do something with response error
            console.log("Response interceptor encountered error");
            return Promise.reject(error);
        });
    }
    configMiddleware() {
        //Mounts bodyParser middleware to parse req.body into json format
        this.app.use(body_parser_1.default.json());
        //Parses incoming request bodies containing URL-encoded data
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        //Middleware common to all requests
        this.app.use(appMiddleware_1.AppMiddleware);
        //Error handling middleware
        this.app.use((err, req, res, next) => {
            console.log(err);
        });
    }
    setupRouters() {
        //Handling home page requests
        this.app.get("/", (req, res) => {
            res.send("You have reached Home!!!");
        });
        //Mounts router for products paths
        this.app.use("/products", new productsRouter_1.ProductsRouter().router);
    }
    start() {
        const port = process.env.PORT || 3000;
        data_source_1.AppDataSource.initialize().then(() => {
            //Start listening to requests on http port 3000
            this.app.listen(port, () => {
                console.log(`Server is running in http://localhost:${port}`);
            });
        });
    }
}
const app = new App();
app.start();
//# sourceMappingURL=app.js.map