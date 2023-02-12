import mongoose from "mongoose";

const batchSchema = mongoose.Schema(
  {
    name: {
      type: String,
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

const Material = mongoose.model("Batch", batchSchema);

export default Batch;
