import asyncHandler from "../middlewares/asyncHandler.js"
import { Coupon } from "../models/Coupon.js"

export const createCoupon = asyncHandler(async(req, res) => {
    const { code, amount } = req.body 

    if(!code || !amount){
        return res.json({
            success: false,
            message: "Please fill in all fields"
        })
    }

    const existingCoupon = await Coupon.findOne({ code })
    console.log(existingCoupon)
    if(existingCoupon){
        res.status(500)
        throw new Error("Coupon existed")
    }
    
    await Coupon.create({
        code, amount
    })

    return res.status(201).json({
        success: true,
        message: `Coupon ${code} created successfully`
    })
})

export const getCoupons = asyncHandler(async(req, res) => {
    const coupons = await Coupon.find({})
    
    return res.status(201).json({
        success: true,
        coupons
    })
})

export const createPayment = async(req, res) => {

}