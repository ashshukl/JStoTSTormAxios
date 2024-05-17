import express, { response } from "express";
import bodyParser from "body-parser";
import { ProductsRouter } from "./routers/productsRouter";
import { AppMiddleware } from "./middlewares/appMiddleware";
import { AppDataSource } from "./db/data-source";
import axios from "axios";

//Important to import this in app.ts file
import "reflect-metadata";

class App {
  app: express.Express;
  constructor() {
    this.app = express();
    this.configMiddleware();
    this.setupRouters();

    this.configAxiosInterceptors();
  }

  //This method configures axios interceptors
  configAxiosInterceptors() {
    // Request interceptor
    axios.interceptors.request.use(
      (config) => {
        console.log("3. Request intercepted by Axios-Request-Interceptor");
        // Add custom headers to the request config
        console.log(
          `3.1 Veifying access token: ${config.headers["access-token"]}`
        );
        return config;
      },
      (error) => {
        console.log("Request interceptor encountered error");
        return Promise.reject(error);
      }
    );

    // Response interceptor
    axios.interceptors.response.use(
      (response) => {
        // Do something with response data
        console.log("4. Response intercepted by Axios-Response-Interceptor");
        return response;
      },
      (error) => {
        // Do something with response error
        console.log("Response interceptor encountered error");
        return Promise.reject(error);
      }
    );
  }

  configMiddleware() {
    //Mounts bodyParser middleware to parse req.body into json format
    this.app.use(bodyParser.json());
    //Parses incoming request bodies containing URL-encoded data
    this.app.use(bodyParser.urlencoded({ extended: true }));
    //Middleware common to all requests
    this.app.use(AppMiddleware);

    //Error handling middleware
    this.app.use(
      (
        err: any,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        console.log(err);
      }
    );
  }

  setupRouters() {
    //Handling home page requests
    this.app.get("/", (req, res) => {
      res.send("You have reached Home!!!");
    });

    //Mounts router for products paths
    this.app.use("/products", new ProductsRouter().router);
  }

  start() {
    const port = process.env.PORT || 3000;
    AppDataSource.initialize().then(() => {
      //Start listening to requests on http port 3000
      this.app.listen(port, () => {
        console.log(`Server is running in http://localhost:${port}`);
      });
    });
  }
}

const app = new App();
app.start();
