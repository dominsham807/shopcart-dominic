import asyncHandler from "../middlewares/asyncHandler.js"
import userModel from "../models/User.js"
import { comparePassword, hashPassword } from "../utils/authHelper.js"
import jwt from "jsonwebtoken"

export const registerUser = asyncHandler(async(req,res) => {
    try{
        const { name, email, password, phone } = req.body
        if(!name || !email || !password || !phone){
            return res.send({ messsage: "All fields are required" })
        }

        const existingUser = await userModel.findOne({ email })
        if(existingUser){
            res.status(400)
            throw new Error("This email already has an account. Please use another one")
        }

        const hashedPassword = await hashPassword(password)
        const user = await userModel.create({
            name, email, password: hashedPassword, phone
        })

        res.status(200).json({
            success: true,
            message: "Registration success! Please login!",
            user
        })
    } catch(error){
        console.log(error)
        res.status(500)
        throw new Error("Failed to register")
    }
})

export const loginUser = async(req, res) => {
    try{
        const { email, password } = req.body

        if(!email || !password){
            res.status(400)
            throw new Error("Please fill in all fields")
        }
    
        const user = await userModel.findOne({ email })
        console.log(user)

        if(!user){
            res.status(400)
            throw new Error("Invalid email address")
        }
    
        const isPasswordMatched = await comparePassword(password, user.password)
        if(!isPasswordMatched){
            res.status(400)
            throw new Error("Wrong credentials")
        }
    
        const token = jwt.sign({ _id: user._id}, process.env.JWT_SECRET, {
            expiresIn: "7d"
        })

        res.status(200).json({
            success: true,
            message: "Successfully login",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone
            },
            token
        })
    } catch(error){
        console.log(error)
        res.status(500)
        throw new Error("Login error")
    }
}