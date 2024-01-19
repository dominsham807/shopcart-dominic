import userModel from "../models/User.js"
import { comparePassword, hashPassword } from "../utils/authHelper.js"
import jwt from "jsonwebtoken"

export const registerUser = async(req,res) => {
    try{
        const { name, email, password, phone } = req.body
        if(!name || !email || !password || !phone){
            return res.send({ messsage: "All fields are required" })
        }

        const existingUser = await userModel.findOne({ email })
        if(existingUser){
            return res.json({
                success: false,
                message: "This email already has an account. Please use another one"
            })
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
        res.status(500).send({
            success: false,
            message: "Error in registration",
            error 
        })
    }
}

export const loginUser = async(req, res) => {
    try{
        const { email, password } = req.body

        if(!email || !password){
            return res.status(404).send({
                success: false,
                message: "Please fill in all fields"
            })
        }
    
        const user = await userModel.findOne({ email })
        console.log(user)

        if(!user){
            return res.json({
                success: false,
                message: "Invalid email address",
            });
        }
    
        const isPasswordMatched = await comparePassword(password, user.password)
            if(!isPasswordMatched){
                return res.send({
                    success: false,
                    message: "Wrong credentials",
                });
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
        res.status(500).send({
            success: false,
            message: "Error in login",
            error 
        })
    }
}