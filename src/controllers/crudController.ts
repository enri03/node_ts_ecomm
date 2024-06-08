import database from "../database";
import { IProductInput } from "../interfaces/IProductInputs";
import Product, { ProductMap } from "../models/product";
import { handleError, isValidInputs } from "../utilities/errorHandle";
import { Request, Response } from "express";

export const createProduct = async (req: Request, res: Response) => {
  ProductMap(database);
  const { name, description, price, stockQuantity, category }: IProductInput =
    req.body;

  try {
    if (!isValidInputs(res, req.body as IProductInput)) return;
    const newProduct = await Product.create({
      name,
      description,
      price,
      stockQuantity,
      category,
    });
    res.status(201).json(newProduct);
  } catch (error) {
    handleError(res, "Failed to create product.", 500);
  }
};

export const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  ProductMap(database);

  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return handleError(res, "Product not found.", 404);
    }
    res.json(product);
  } catch (error) {
    handleError(res, "Failed to retrieve product.", 500);
  }
};

export const getAllProducts = async (_req: Request, res: Response) => {
  ProductMap(database);

  try {
    const products = await Product.findAll({
      attributes: ["id", "name"], // get only 'id' and 'name' attribute
    });
    if(products.length===0){
        res.status(200).json({message:"There are no products to display"})
        return
    }
    res.json(products);
  } catch (error) {
    handleError(res, "Failed to retrieve products.", 500);
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updates: IProductInput = req.body;
  ProductMap(database);

  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return handleError(res, "Product not found.", 404);
    } else {
      const productPlainObject = product.toJSON(); // use .toJSON to convert a Sequelize model instance into a plain js object
      const updatedProduct: IProductInput = {
        ...productPlainObject,
        ...updates,
      };
      if (!isValidInputs(res, updatedProduct)) return;
      const returnUpdatedProduct = await product.update(updatedProduct);
      res.json(returnUpdatedProduct);
    }
  } catch (error) {
    handleError(res, "Failed to update product.", 500);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  ProductMap(database);

  try {
    const numDeleted = await Product.destroy({ where: { id } });
    if (numDeleted === 0) {
      return handleError(res, "Product not found.", 404);
    }
    res.status(200).json({ message: `Product was deleted with success` });
  } catch (error) {
    handleError(res, "Failed to delete product.", 500);
  }
};
