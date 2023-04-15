import mongoose from "mongoose";
import Batch from "./batchModel.js";

const rawMaterialSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    reOrderLevel: {
      type: Number,
      required: true,
    },

    dailyCap: {
      type: Number,
      required: true,
    },
    measurement: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Add a pre hook to the material schema to prevent deletion if there are referencing documents
rawMaterialSchema.pre("remove", async function (next) {
  try {
    // Retrieve the ID of the material being deleted
    const materialId = this._id;

    // Count the number of referencing documents
    const batchCount = await Batch.countDocuments({ materialId });

    // If there are any referencing documents, throw an error
    if (batchCount > 0) {
      const error = new Error(
        "Cannot delete material with referencing batches"
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

const Material = mongoose.model("Material", rawMaterialSchema);

export default Material;
