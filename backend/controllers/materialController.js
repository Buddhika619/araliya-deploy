import Batch from "../models/batchModel.js";
import Material from "../models/rawMaterialModel.js";
import asyncHandler from "express-async-handler";

// @des  create a Material
// @route POST /api/materials/
// @access Private/Admin
const createMaterial = asyncHandler(async (req, res) => {
  const material = new Material({
    name: req.body.name,
    reOrderLevel: req.body.reOrderLevel,
    dailyCap: req.body.dailyCap,
    measurement: req.body.measurement,
    supplier: req.body.supplierId
  });

  const createdMaterial = await material.save();
  res.status(201).json(createdMaterial);
});

// @des  Update a Material
// @route PUT /api/materials/:id
// @access Private/Admin
const updateMaterial = asyncHandler(async (req, res) => {

  const { name, reOrderLevel, dailyCap, measurement,supplierId } = req.body;
  console.log(supplierId)

  const material = await Material.findById(req.params.id);

  if (material) {
    material.name = name;
    material.reOrderLevel = reOrderLevel;
    material.dailyCap = dailyCap;
    material.measurement = measurement;
    material.supplierId = supplierId
    const updatedMaterial = await material.save();
    res.json(updatedMaterial);
  } else {
    res.status(404);
    throw new Error("Material not found");
  }
});

// @des  Delete a material
// @route DELETE /api/materials/:id
// @access Private/Admin
const deleteMaterial = asyncHandler(async (req, res) => {
  console.log('hti')
  const material = await Material.findById(req.params.id);

  if (material) {
    await material.remove();
    res.json({ message: "material removed" });
  } else {
    res.status(404);
    throw new Error("material not found!");
  }
});

// @des  Fetch  single material
// @route GET /api/materials/:id
// @access Public
const getMaterialById = asyncHandler(async (req, res) => {
  const material = await Material.findById(req.params.id);

  if (material) {
    res.json(material);
  } else {
    res.status(404);
    throw new Error("Material not found!");
  }
});

// @desc  Get all materials
// @route GET /api/materials
// @access Private/Admin

const getMaterials = asyncHandler(async (req, res) => {
  const materials = await Material.find();
  res.json(materials);
});



// @des  fetch material stock
// @route GET /api/materials/stock
// @access admin

/**this function for get all off the shelf  products*/
const getMaterialStock = asyncHandler(async (req, res) => {


  const stock = await Batch.aggregate([
    // Match products with a productRating field
    { $match: { materialId: { $exists: true } } },
    
    // Group products by productId and calculate the total qty
    { $group: {
        _id: "$materialId",
        totalQty: { $sum: "$qty" },
      } },
  
    // Lookup data from the Product collection using productId
    { $lookup: {
        from: "materials",
        localField: "_id",
        foreignField: "_id",
        as: "material"
      } },
  
    // Unwind the product array to get a single document per batch item
    { $unwind: "$material" },

    { $sort: { "material.createdAt": 1 } }
  ]);

console.log(stock)



  //  products = await Product.find({ active: true })

  res.json({
    stock,
  })
})

export {
  createMaterial,
  updateMaterial,
  deleteMaterial,
  getMaterialById,
  getMaterials,
  getMaterialStock
};
