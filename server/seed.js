import dotenv from "dotenv"
import connectDB from "./config/connectDB.js"
import products from "./data.js"
import Product from "./models/Product.js"
import colors from "colors"

dotenv.config()

connectDB()

const importData = async() => {
    try{
        await Product.deleteMany()
        await Product.insertMany(products)
        console.log("Data imported success".green.inverse)
        process.exit()
    } catch(error){
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
}

importData()