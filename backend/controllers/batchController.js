import Batch from "../models/batchModel.js";
import asyncHandler from "express-async-handler";
import Material from "../models/rawMaterialModel.js";
import Product from "../models/productModel.js";
import Reservation from "../models/reservationModel.js";
import { v4 as uuidv4 } from "uuid";

const assignBulk = asyncHandler(async (req, res) => {
  console.log("thats a hit");
  const batchSummary = await Batch.aggregate([
    // Look up material information using materialId
    {
      $lookup: {
        from: "materials",
        localField: "materialId",
        foreignField: "_id",
        as: "material",
      },
    },
    // Unwind the "material" array so that each document represents a single material
    {
      $unwind: "$material",
    },
    // Group batches by materialId and calculate total quantity
    {
      $group: {
        _id: "$material._id", // Group by materialId
        name: { $first: "$material.name" }, // Get the first name
        reOrderLevel: { $first: "$material.reOrderLevel" }, // Get the first reorder level
        dailyCap: { $first: "$material.dailyCap" }, // Get the first daily capacity
        measurement: { $first: "$material.measurement" }, // Get the first measurement
        totalQty: { $sum: "$qty" }, // Calculate total quantity
      },
    },
  ]);

  let materialCount = 0; // Count of materials with enough inventory
  let requestID = uuidv4(); // Unique ID for the request

  // Loop through each material in batchSummary
  for (let j = 0; j < batchSummary.length; j++) {
    console.log(batchSummary);
    // Check if totalQty is greater than or equal to dailyCap
    if (batchSummary[j].totalQty >= batchSummary[j].dailyCap) {
      materialCount++; // Increment materialCount

      // Find all batches with materialId and non-zero qty
      const batches = await Batch.find({
        materialId: batchSummary[j]._id,
        qty: { $gt: 0 },
      });

      let reservedCount = 0; // Count of reserved inventory for current material
      // Loop through each batch
      for (let i = 0; i < batches.length; i++) {
        // Check if reservedCount is less than dailyCap
        if (reservedCount < batchSummary[j].dailyCap) {
          // Check if qty of batch is less than dailyCap
          if (batches[i].qty < batchSummary[j].dailyCap) {
            let requiredQty = batchSummary[j].dailyCap - reservedCount; // Calculate remaining required quantity
            let requiredPer = 0; // Required quantity for current batch

            // Check if requiredQty is less than qty of batch
            if (requiredQty < batches[i].qty) {
              requiredPer = requiredQty; // Set requiredPer to remaining required quantity
            } else {
              requiredPer = batches[i].qty; // Set requiredPer to qty of batch
            }

            // Create new reservation and save it to database
            const reservation = new Reservation({
              materialId: batches[i].materialId,
              batchId: batches[i]._id,
              qty: requiredPer,
              requestId: requestID,
            });
            await reservation.save();

            // Update qty of batch and save it to database
            batches[i].qty = batches[i].qty - requiredPer;
            await batches[i].save();

            reservedCount = reservedCount + requiredPer; // Increment reservedCount by requiredPer
          }

          // Check if qty of batch is greater than or equal to dailyCap
          if (batches[i].qty >= batchSummary[j].dailyCap) {
            reservedCount = batchSummary[j].dailyCap; // Set reservedCount to dailyCap

            // Create new reservation and save it to database
            const reservation = new Reservation({
              materialId: batches[i].materialId,
              batchId: batches[i]._id,
              qty: batchSummary[j].dailyCap,
              requestId: requestID,
            });
            await reservation.save();

            // Update qty of batch and save it to database
            batches[i].qty = batches[i].qty - batchSummary[j].dailyCap;
            await batches[i].save();
          }
        } else {
          break; // Exit loop if reservedCount is greater than or equal to dailyCap
        }
      }
    }
  }

  res.json({
    batchSummary,
    res: materialCount,
  });
});

const assignOne = asyncHandler(async (req, res) => {
  let requestID = uuidv4(); // Unique ID for the request
  let requestedQty = Number(req.body.qty);
  console.log("thats a hit");
  const mat = await Material.findById(req.body.id);

  if (isNaN(requestedQty)) {
    res.status(400);
    throw new Error(`Invalid Input`);
  }

  const total = await Batch.aggregate([
    // Group by materialId and calculate the total quantity of material for each materialId

    { $match: { materialId: mat._id } },

    {
      $group: {
        _id: "$materialId",
        totalQty: { $sum: "$qty" },
      },
    },
  ]);

  const batches = await Batch.find({
    materialId: mat._id,
    qty: { $gt: 0 },
  });

  let reservedCount = 0; // Count of reserved inventory for current material

  if (total[0].totalQty < requestedQty) {
    console.log(total.totalQty);
    res.status(400);
    throw new Error(`Quantity should be less than ${total[0].totalQty}`);
  }

  // Loop through each batch
  for (let i = 0; i < batches.length; i++) {
    // Check if reservedCount is less than dailyCap
    if (reservedCount < requestedQty) {
      // Check if qty of batch is less than dailyCap
      if (batches[i].qty < requestedQty) {
        let requiredQty = requestedQty - reservedCount; // Calculate remaining required quantity
        let requiredPer = 0; // Required quantity for current batch

        // Check if requiredQty is less than qty of batch
        if (requiredQty < batches[i].qty) {
          requiredPer = requiredQty; // Set requiredPer to remaining required quantity
        } else {
          requiredPer = batches[i].qty; // Set requiredPer to qty of batch
        }

        // Create new reservation and save it to database
        const reservation = new Reservation({
          materialId: batches[i].materialId,
          batchId: batches[i]._id,
          qty: requiredPer,
          requestId: requestID,
        });
        await reservation.save();

        // Update qty of batch and save it to database
        batches[i].qty = batches[i].qty - requiredPer;
        await batches[i].save();

        reservedCount = reservedCount + requiredPer; // Increment reservedCount by requiredPer
      }

      // Check if qty of batch is greater than or equal to dailyCap
      if (batches[i].qty >= requestedQty) {
        reservedCount = requestedQty; // Set reservedCount to dailyCap

        // Create new reservation and save it to database
        const reservation = new Reservation({
          materialId: batches[i].materialId,
          batchId: batches[i]._id,
          qty: requestedQty,
          requestId: requestID,
        });
        await reservation.save();

        // Update qty of batch and save it to database
        batches[i].qty = batches[i].qty - requestedQty;
        await batches[i].save();
      }
    } else {
      break; // Exit loop if reservedCount is greater than or equal to dailyCap
    }
  }

  res.json({ total, mat });
});

// @des  create a Batch
// @route POST /api/batch/
// @access Private/Admin
const createBatch = asyncHandler(async (req, res) => {
  console.log(req.body);
  // Find the material or  product with the given ID in the request body
  const material = await Material.findById(req.body.materialId);
  const product = await Product.findById(req.body.materialId);
  

  // If a material with the given ID was found Create a new batch with the material ID, quantity, and cost from the request body
  if (material) {
    const batch = new Batch({
      materialId: req.body.materialId,
      originalQty: req.body.qty,
      supplierId: req.body.supplierId,
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
      res.status(400);
      throw new Error("Invalid Input");
    }

    if(!req.body.salesPrice){
      res.status(400);
      throw new Error("Sales price is required!");
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
  const { materialId, qty, cost, salesPrice, supplierId } = req.body;

  const batch = await Batch.findById(req.params.id);

console.log(req.body)
  if (batch) {
    //If the batch has a material ID, update it with the new value
    if (batch.materialId) {
      batch.materialId = materialId;
    }

    // If the batch has a product ID, update it with the new value, and update the sales price
    if (batch.productId) {
      if(!req.body.salesPrice){
        res.status(400);
        throw new Error("Sales price is required!");
      }
      batch.productId = materialId;
      batch.salesPrice = salesPrice;
    }

    // Update the quantity and cost with the new values
    batch.qty = qty;
    batch.originalQty = qty;
    batch.cost = cost;
    batch.supplierId = supplierId;

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
    supplierId: batch.supplierId,
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

// @desc  Get all kitchenRecerved
// @route GET /api/materials/kitchen
// @access Private/Admin

const getKitchenDetails = asyncHandler(async (req, res) => {
  // get all batches and sort by createdAt in descending order
  const reservations = await Reservation.find()
    .sort({ createdAt: -1 })
    .populate("materialId");

  res.status(201).json(reservations);
});
export {
  createBatch,
  updateBatch,
  getBatchbyID,
  getBatches,
  assignBulk,
  getKitchenDetails,
  assignOne,
};
