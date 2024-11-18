import mongoose from "mongoose"

const ProductSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter prodict name"]
        },

        quantity: {
            type: Number,
            required: true,
            default: 0
        },

        price: {
            type: Number,
            required: true,
            default: 0
        }
    },
    {
        Timestamp: true
    }
)

const Product = mongoose.model("Products", ProductSchema)

export default Product