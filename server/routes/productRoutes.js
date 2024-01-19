import express from "express"
import { getAllProducts, getCategories, getLatestProducts, getProductById, getProductsByCategory } from "../controllers/productController.js"

const router = express.Router()

router.get("/", getAllProducts)
router.get("/latest", getLatestProducts)
router.get("/categories", getCategories)
router.get("/categories/:category", getProductsByCategory)
router.get("/:id", getProductById)

export default router 