import asyncHandler from "../middlewares/asyncHandler.js"
import { Order } from "../models/Order.js"
import { reduceStock } from "../utils/stockManagement.js"

export const newOrder = asyncHandler(async(req, res) => {
    const { shippingInfo, user, subtotal, shippingCharges, discount, total, orderItems } = req.body 
  
    if(!shippingInfo || !user || !subtotal || !shippingCharges || !discount || !total || !orderItems){
        res.status(400)
        throw new Error("Please enter all the fields")
    }

    const order = await Order.create({
        shippingInfo, user, subtotal, shippingCharges, discount, total, orderItems 
    })
    await reduceStock(orderItems)
    
    return res.status(201).json({
        success: true,
        message: "Order placed successfully",
        order
    })
})