import mongoose from "mongoose";

const batchSchema = mongoose.Schema(
  {
    materialId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Material',
    },

    batchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Batch',
    },
    qty: {
      type: Number,
      required: true,
    },

    requestId: {
        type: String,
        required: true,
        
    }
  
  },
  {
    timestamps: true,
  }
);

const Reservation = mongoose.model("Reservation", batchSchema);

export default Reservation;
