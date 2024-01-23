import express from "express"
import { createCoupon, getCoupons } from "../controllers/paymentController.js"

const app = express.Router()

app.route('/coupon').post(createCoupon).get(getCoupons)

export default app 