import express, { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from "../controllers/crudController";

const router: Router = express.Router();

router.post("/products", createProduct);
router.get("/products", getAllProducts);
router.get("/products/:id", getProduct);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);
export default router;
