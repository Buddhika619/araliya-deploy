import sendEmail from '../Utils/sendEmail.js';
import Category from '../models/categoryModel.js'
import asyncHandler from "express-async-handler";

// @des  create a Material
// @route POST /api/supplier/
// @access Private/Admin
const createCategory = asyncHandler(async (req, res) => {
  const category = new Category({
    category: req.body.category,
  });

  const createdMaterial = await category.save();
  res.status(201).json(createdMaterial);
});

// @des  Update a Material
// @route PUT /api/supplier/:id
// @access Private/Admin
const updateCategory = asyncHandler(async (req, res) => {


  const { category } = req.body;

  const categoryObj = await Category.findById(req.params.id);

  if (categoryObj) {
    categoryObj.category = category;
    const updatedCategory = await categoryObj.save();
    res.json(updatedCategory);
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});

// @des  Delete a material
// @route DELETE /api/supplier/:id
// @access Private/Admin
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (category) {
    await category.remove();
    res.json({ message: "category removed" });
  } else {
    res.status(404);
    throw new Error("category not found!");
  }
});

// @des  Fetch  single material
// @route GET /api/supplier/:id
// @access Public
const getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (category) {
    res.json(category);
  } else {
    res.status(404);
    throw new Error("category not found!");
  }
});

// @desc  Get all materials
// @route GET /api/supplier
// @access Private/Admin

const getCategories = asyncHandler(async (req, res) => {
  const category = await Category.find();
  res.json(category);
});


export {
    createCategory,
    updateCategory,
    deleteCategory,
    getCategoryById,
    getCategories,
};
