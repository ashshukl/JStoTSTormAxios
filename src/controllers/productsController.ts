import express from "express";
import { AppDataSource } from "../db/data-source";
import { Product } from "../models/product";
import axios from "axios";

export class ProductsController {
  static async getAll(req: express.Request, res: express.Response) {
    // res.send(await AppDataSource.manager.find(Product));

    // Making a GET request
    axios
      .get("https://axiosnode.free.beeceptor.com", {
        headers: {
          "access-token": req.headers["access-token"],
          CustomHeader: "CustomValue",
        },
      })
      .then((response) => {
        console.log(
          "5. Reached then.",
          "\n",
          "5.1 Response Data:",
          response.data
        );
        res.send(response.data);
      })
      .catch(function (error) {
        console.log("Error:", error);
        throw new Error(error);
      });

    //Other requests
    // axios.post(url: string, data?: any, config?: AxiosRequestConfig<any> | undefined): Promise<AxiosResponse<any, any>>
    // axios.delete(url: string, config?: AxiosRequestConfig<any> | undefined): Promise<AxiosResponse<any, any>>
  }

  static async create(req: express.Request, res: express.Response) {
    const product: Product = new Product();
    product.name = req.body.name;
    product.price = req.body.price;
    product.save().then(() => {
      res.send(product);
    });
    //res.send(await AppDataSource.manager.save(product));
  }

  static async getById(req: express.Request, res: express.Response) {
    console.log(`Recieved id = ${req.query.id}`);
    res.send(
      await AppDataSource.getRepository(Product).findOne({
        where: {
          id: req.query.id as any,
        },
      })
    );
  }
}
