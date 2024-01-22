import { Coupon } from "../models/Coupon.js"


export const createCoupon = async(req, res) => {
    const { code, amount } = req.body 

    if(!coupon || !amount){
        return res.json({
            success: false,
            message: "Please fill in all fields"
        })
    }

    await Coupon.create({
        code, amount
    })

    return res.status(201).json({
        success: true,
        message: `Coupon ${code} created successfully`
    })
}
