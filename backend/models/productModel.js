import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    rating: {
        type:Number,
        required: true
    },
    comment: {
        type:String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})


const productSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    reviews: [reviewSchema],
    rating: {
        type: Number,
        required: true,
        default: 0,
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0,
    },
    price: {
        type: Number,
        default: 0,
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0,
    },
    reOrderLevel: {
        type: Number,
        required: true,
        default: 0,
    },
    dailyCapacity: {
        type: Number,
       
        default: 0,
    },
    active: {
        type: Boolean,
        required: true,
        default: true,
    },
    type: {
        type: Boolean,
        required: true,
        default: false,
    },

},{
    timestamps:true
})

const Product = mongoose.model('Product', productSchema)

export default Product