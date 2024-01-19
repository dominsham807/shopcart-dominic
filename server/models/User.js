import mongoose from "mongoose"

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true 
        },
        email: {
            type: String,
            required: true,
            unique: true 
        },
        password: {
            type: String,
            required: true 
        },
        phone: {
            type: String,
            required: true 
        },
        photo: {
            type: {}
        },
        role: {
            type: String,
            default: "user"
        }
    },
    { timestamps: true }
)

export default mongoose.model("Users", userSchema)