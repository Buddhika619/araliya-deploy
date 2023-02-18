import Batch from "../models/batchModel.js";
import asyncHandler from "express-async-handler";
import Material from "../models/rawMaterialModel.js";

const testfunc = asyncHandler(async(req,res) => {
//  const x = await Batch.aggregate([
//   {
//     $lookup: {
//       from: "materials",
//       localField: "materialId",
//       foreignField: "_id",
//       as: "material"
//     }
//   },
//   {
//     $unwind: "$material"
//   },
//   {
//     $group: {
//       _id: "$material._id",
//       name: { $first: "$material.name" },
//       reOrderLevel: { $first: "$material.reOrderLevel" },
//       dailyCap: { $first: "$material.dailyCap" },
//       measurement: { $first: "$material.measurement" },
//       batches: {
//         $push: {
//           qty: "$qty",
//           cost: "$cost",
//           salesPrice: "$salesPrice"
//         }
//       }
//     }
//   }
// ])

const x = await Batch.aggregate([
  {
    $lookup: {
      from: "materials",
      localField: "materialId",
      foreignField: "_id",
      as: "material"
    }
  },
  {
    $unwind: "$material"
  },
  {
    $group: {
      _id: "$material._id",
      name: { $first: "$material.name" },
      reOrderLevel: { $first: "$material.reOrderLevel" },
      dailyCap: { $first: "$material.dailyCap" },
      measurement: { $first: "$material.measurement" },
      totalQty: { $sum: "$qty" }
    }
  }
])

res.json(x)
})

// @des  create a Batch
// @route POST /api/batch/
// @access Private/Admin
const createBatch = asyncHandler(async (req, res) => {
  const batch = new Batch({
    materialId: req.body.materialId,
    qty: req.body.qty,
    cost: req.body.cost,
  });

  const result = await batch.save();
  res.status(201).json(result);
});

// @des  Update a Batch
// @route PUT /api/batch/:id
// @access Private/Admin
const updateBatch = asyncHandler(async (req, res) => {
  const { materialId, qty, cost, salesPrice } = req.body;

  const batch = await Batch.findById(req.params.id);

  if (batch) {
    batch.materialId = materialId
    batch.qty = qty
    batch.cost = cost
    
    const update = await batch.save();
    res.json(update);
  } else {
    res.status(404);
    throw new Error("Material not found");
  }
});

// @des  Delete a batch
// @route DELETE /api/batch/:id
// @access Private/Admin
// const deleteBatch = asyncHandler(async (req, res) => {
//   const material = await Material.findById(req.params.id);

//   if (material) {
//     await material.remove();
//     res.json({ message: "material removed" });
//   } else {
//     res.status(404);
//     throw new Error("material not found!");
//   }
// });

// @des  Fetch  single material
// @route GET /api/batch/:id
// @access Public
const getBatchbyID = asyncHandler(async (req, res) => {
  const batch = await Batch.findById(req.params.id).populate("materialId");
  const response = {
    materialId: batch.materialId._id,
    _id: batch._id,
    qty: batch.qty,
    cost: batch.cost,
  };

  if (batch) {
    res.json(response);
  } else {
    res.status(404);
    throw new Error("Material not found!");
  }
});

// @desc  Get all materials
// @route GET /api/materials
// @access Private/Admin

const getBatches = asyncHandler(async (req, res) => {
  const batch = await Batch.find().populate("materialId");
  res.json(batch);
});

export { createBatch, updateBatch, getBatchbyID, getBatches ,testfunc};
