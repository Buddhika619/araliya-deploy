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
  });

  const createdMaterial = await material.save();
  res.status(201).json(createdMaterial);
});

// @des  Update a Material
// @route PUT /api/materials/:id
// @access Private/Admin
const updateMaterial = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, reOrderLevel, dailyCap, measurement } = req.body;

  const material = await Material.findById(req.params.id);

  if (material) {
    (material.name = name),
      (material.reOrderLevel = reOrderLevel),
      (material.dailyCap = dailyCap),
      (material.measurement = measurement);
    const update = await material.save();
    res.json(update);
  } else {
    res.status(404);
    throw new Error("Material not found");
  }
});

// @des  Delete a material
// @route DELETE /api/materials/:id
// @access Private/Admin
const deleteMaterial = asyncHandler(async (req, res) => {
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

export {
  createMaterial,
  updateMaterial,
  deleteMaterial,
  getMaterialById,
  getMaterials,
};
