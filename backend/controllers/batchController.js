import Batch from "../models/batchModel.js";
import asyncHandler from "express-async-handler";
import Material from "../models/rawMaterialModel.js";
import Product from "../models/productModel.js";

const testfunc = asyncHandler(async (req, res) => {
  const x = await Batch.aggregate([
    {
      $lookup: {
        from: "materials",
        localField: "materialId",
        foreignField: "_id",
        as: "material",
      },
    },
    {
      $unwind: "$material",
    },
    {
      $group: {
        _id: "$material._id",
        name: { $first: "$material.name" },
        reOrderLevel: { $first: "$material.reOrderLevel" },
        dailyCap: { $first: "$material.dailyCap" },
        measurement: { $first: "$material.measurement" },
        totalQty: { $sum: "$qty" },
      },
    },
  ]);

  res.json(x);
});

// @des  create a Batch
// @route POST /api/batch/
// @access Private/Admin
const createBatch = asyncHandler(async (req, res) => {
  // Find the material or  product with the given ID in the request body
  const material = await Material.findById(req.body.materialId);
  const product = await Product.findById(req.body.materialId);

  // If a material with the given ID was found Create a new batch with the material ID, quantity, and cost from the request body
  if (material) {
    const batch = new Batch({
      materialId: req.body.materialId,
      originalQty: req.body.qty,
      qty: req.body.qty,
      cost: req.body.cost,
    });

    // Save the new batch to the database
    const result = await batch.save();

    res.status(201).json(result);
  }

  // If a ready made product with the given ID was found
  if (product && product.type === false) {
    // Check that the sales price,cost and qty is valid
    if (
      Number(req.body.salesPrice) < 1 ||
      Number(req.body.qty) < 1 ||
      Number(req.body.cost) < 1
    ) {
      res.status(401);
      throw new Error("Invalid Input");
    }

    // Create a new batch
    const batch = new Batch({
      productId: req.body.materialId,
      qty: req.body.qty,
      originalQty: req.body.qty,
      cost: req.body.cost,
      salesPrice: req.body.salesPrice,
    });

    // Save the new batch to the database
    const result = await batch.save();
    res.status(201).json(result);
  }

  res.status(404);
  throw new Error("ID not found");
});

// @des  Update a Batch
// @route PUT /api/batch/:id
// @access Private/Admin
const updateBatch = asyncHandler(async (req, res) => {
  const { materialId, qty, cost, salesPrice ,originalQty} = req.body;

  const batch = await Batch.findById(req.params.id);

  if (batch) {
    //If the batch has a material ID, update it with the new value
    if (batch.materialId) {
      batch.materialId = materialId;
    }

    // If the batch has a product ID, update it with the new value, and update the sales price
    if (batch.productId) {
      batch.productId = materialId;
      batch.salesPrice = salesPrice;
    }

    // Update the quantity and cost with the new values
    batch.qty = qty;
    batch.originalQty = originalQty;
    batch.cost = cost;

    const update = await batch.save();
    res.status(201).json(update);
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
  const batch = await Batch.findById(req.params.id);

  // Create a response object
  const response = {
    materialId: batch.materialId ? batch.materialId : batch.productId,
    _id: batch._id,
    originalQty: batch.originalQty,
    qty: batch.qty,
    cost: batch.cost,
    salesPrice: batch.salesPrice && batch.salesPrice,
  };

  console.log(response);
  if (batch) {
    res.status(201).json(response);
  } else {
    res.status(404);
    throw new Error("Material not found!");
  }
});

// @desc  Get all materials
// @route GET /api/materials
// @access Private/Admin

const getBatches = asyncHandler(async (req, res) => {
  let returnArr = [];

  // get all batches and sort by createdAt in descending order
  const batch = await Batch.find().sort({ createdAt: -1 });

  for (let i = 0; i < batch.length; i++) {
    // if batch has materialId, populate material object
    if (batch[i].materialId) {
      const mat = await Batch.findById(batch[i]._id).populate("materialId");
      returnArr.push(mat);
    } else {
      // if batch has productId, populate product object
      const pro = await Batch.findById(batch[i]._id).populate("productId");
      returnArr.push(pro);
    }
  }

  res.status(201).json(returnArr);
});

export { createBatch, updateBatch, getBatchbyID, getBatches, testfunc };
