import Product from "../models/Product.js"
import asyncHandler from "../middlewares/asyncHandler.js"

export const getAllProducts = asyncHandler(async(req, res) => {
    const products = await Product.find({})

    return res.status(200).json({
        success: true,
        products
    })
})

export const getProductById = asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id)
    if(product){
        return res.status(200).json({
            success: true,
            product
        })
    } else{
        res.status(404)
        throw new Error("Product not found")
    }
})

export const getLatestProducts = asyncHandler(async(req, res) => {
    const products = await Product.find({}).sort({ createdAt: -1 })
    
    return res.status(200).json({
        success: true,
        products
    })
})

export const getCategories = async(req, res) => {
    const categories = await Product.distinct("category")
    console.log(categories)
    return res.status(200).json({
        success: true,
        categories
    })
}

export const getProductsByCategory = async(req, res) => {
    try{
        const category = req.params.category

        const categoryProducts = await Product.find({
            category: category 
        }).sort({createdAt: -1}).limit(8)
         
        return res.status(200).json({
            success: true,
            categoryProducts
        })
    } catch(error){
        console.log(error)
        return res.status(404).json({
            success: false,
            message: "Category not exists"
        })
    }
  
}