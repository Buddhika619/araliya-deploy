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
    supplierId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier',
    },
    

},{
    timestamps:true
})


// Add a pre hook to the material schema to prevent deletion if there are referencing documents
productSchema.pre("remove", async function (next) {
    try {
      // Retrieve the ID of the material being deleted
      const productId = this._id;
  
      // Count the number of referencing documents
      const batchCount = await Batch.countDocuments({ productId });
  
      // If there are any referencing documents, throw an error
      if (batchCount > 0) {
        const error = new Error(
          "Cannot delete Batch with referencing batches"
        );
        error.statusCode = 400;
        throw error;
      }
  
      // If there are no referencing documents, proceed with the deletion of the material document
      next();
    } catch (error) {
      next(error);
    }
  });
  

const Product = mongoose.model('Product', productSchema)

export default Product