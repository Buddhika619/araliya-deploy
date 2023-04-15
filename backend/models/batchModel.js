import mongoose from "mongoose";

const batchSchema = mongoose.Schema(
  {
    materialId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Material',
    },

    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },

    supplierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Supplier',
    },
    originalQty: {
      type: Number,
      required: true,
    },
    qty: {
      type: Number,
      required: true,
    },
  
    cost: {
      type: Number,
      required: true,
    },
    salesPrice: {
      type: Number,
      
    },
  },
  {
    timestamps: true,
  }
);

const Batch = mongoose.model("Batch", batchSchema);

export default Batch;
