import mongoose from "mongoose"

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true,
        },
        seller: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        stock: {
            type: Number,
            required: true,
        },
        ratings: {
            type: Number,
            required: true,
        },
        ratingsCount: {
            type: Number,
            required: true,
        },
        img: {
            type: String
        },
        shipping: {
            type: Number,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        reviews: []
    },
    {
        timestamps: true,
    }
)

const Product = mongoose.model('Product', productSchema)

export default Product 