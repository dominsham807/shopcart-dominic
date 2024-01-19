import express from "express"
import dotenv from "dotenv"
import path from "path"
import cors from "cors"
import cookieParser from "cookie-parser"
import morgan from "morgan"
import colors from "colors"
import userRoutes from "./routes/userRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import connectDB from "./config/connectDB.js"

dotenv.config()

const app = express()

connectDB() 

app.use(morgan('dev'))

const PORT = 8000

app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use("/api/users", userRoutes)
app.use("/api/products", productRoutes)

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
})