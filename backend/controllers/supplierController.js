import sendEmail from '../Utils/sendEmail.js';
import Supplier from '../models/supplierModel.js'
import asyncHandler from "express-async-handler";

// @des  create a Material
// @route POST /api/supplier/
// @access Private/Admin
const createSupplier = asyncHandler(async (req, res) => {
  const supplier = new Supplier({
    name: req.body.name,
    address: req.body.address,
    contactNo: req.body.contactNo,
    email: req.body.email,
  });

  const createdMaterial = await supplier.save();
  res.status(201).json(createdMaterial);
});

// @des  Update a Material
// @route PUT /api/supplier/:id
// @access Private/Admin
const updateSupplier = asyncHandler(async (req, res) => {
  console.log(req.params.id)

  const { name, address, contactNo, email } = req.body;

  const supplier = await Supplier.findById(req.params.id);

  if (supplier) {
    supplier.name = name;
    supplier.address = address;
    supplier.contactNo = contactNo;
    supplier.email = email;
    const updatedSupplier = await supplier.save();
    res.json(updatedSupplier);
  } else {
    res.status(404);
    throw new Error("Supplier not found");
  }
});

// @des  Delete a material
// @route DELETE /api/supplier/:id
// @access Private/Admin
const deleteSupplier = asyncHandler(async (req, res) => {
  const supplier = await Supplier.findById(req.params.id);

  if (supplier) {
    await supplier.remove();
    res.json({ message: "supplier removed" });
  } else {
    res.status(404);
    throw new Error("supplier not found!");
  }
});

// @des  Fetch  single material
// @route GET /api/supplier/:id
// @access Public
const getSupplierById = asyncHandler(async (req, res) => {
  const supplier = await Supplier.findById(req.params.id);
  console.log(req.params.id)
  if (supplier) {
    res.json(supplier);
  } else {
    res.status(404);
    throw new Error("Supplier not found!");
  }
});

// @desc  Get all materials
// @route GET /api/supplier
// @access Private/Admin

const getSuppliers = asyncHandler(async (req, res) => {
  const supplier = await Supplier.find();
  res.json(supplier);
});

const sendSupplierMail = asyncHandler(async (req, res) => {
  sendEmail('buddhikagamage619@gmail.com', '')
  console.log('mail sent')
});


export {
  createSupplier,
  updateSupplier,
  deleteSupplier,
  getSupplierById,
  getSuppliers,
};
