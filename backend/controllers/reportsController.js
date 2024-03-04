import Batch from "../models/batchModel.js";

import Order from "../models/orderModel.js";

import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import Reservation from "../models/reservationModel.js";
import Product from "../models/productModel.js";
import Material from "../models/rawMaterialModel.js";
//@des get configs
//@route GET  /api/status
//@access Public

const getkitchenRequestData = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const reservation = await Reservation.findById(id);
  const requests = await Reservation.find({
    requestId: reservation.requestId,
  }).populate("materialId");

  res.json({
    requests,
  });
});

//@des get configs
//@route GET  /api/status
//@access Public

const getMonthlySales = asyncHandler(async (req, res) => {
  const currentMonthStart = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  );

  const currentMonthEnd = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0
  );

  // const salesItemsArray = await Order.aggregate([
  //   { $unwind: "$orderItems" },
  //   { $project: { _id: 0, orderItem: "$orderItems", orderId: "$_id",createdAt: 1  } },
  //   { $sort: { createdAt: -1 } }
  // ]);

  const salesItemsArray = await Order.aggregate([
    // Use a $match stage to filter documents with a createdAt date within the current month
    {
      $match: { createdAt: { $gte: currentMonthStart, $lte: currentMonthEnd } },
    },

    // Use a $unwind stage to create a separate document for each order item
    { $unwind: "$orderItems" },

    // Use a $project stage to add a field with the total price for each item
    {
      $project: {
        itemName: "$orderItems.name",
        quantitySold: "$orderItems.qty",
        totalRevenue: { $multiply: ["$orderItems.qty", "$orderItems.price"] },
        createdAt: new Date(),
      },
    },

    // Use a $group stage to group the documents by order item name and calculate the sum of quantities and prices
    {
      $group: {
        _id: "$itemName",
        qty: { $sum: "$quantitySold" },
        price: { $sum: "$totalRevenue" },
      },
    },

    // Use a $project stage to rename the fields and remove the _id field
    {
      $project: {
        _id: 0,
        itemName: "$_id",
        quantitySold: "$qty",
        totalRevenue: "$price",
        createdAt: 1,
      },
    },
  ]);

  res.json({
    salesItemsArray,
  });
});

//@des get configs
//@route GET  /api/status
//@access Public

const getSalesAfter = asyncHandler(async (req, res) => {
  const dates = (req.params.date).split('x')

  const startDate = new Date(dates[0]);
  const endDate = new Date(dates[1]);

  const salesItemsArray = await Order.aggregate([
    // Use a $match stage to filter documents with a createdAt date within the current month
    {
      $match: {
        createdAt: { $gte: startDate, $lte: endDate }
      },
    },

    // Use a $unwind stage to create a separate document for each order item
    { $unwind: "$orderItems" },

    // Use a $project stage to add a field with the total price for each item
    {
      $project: {
        itemName: "$orderItems.name",
        quantitySold: "$orderItems.qty",
        totalRevenue: { $multiply: ["$orderItems.qty", "$orderItems.price"] },
        createdAt: new Date(),
      },
    },

    // Use a $group stage to group the documents by order item name and calculate the sum of quantities and prices
    {
      $group: {
        _id: "$itemName",
        qty: { $sum: "$quantitySold" },
        price: { $sum: "$totalRevenue" },
      },
    },

    // Use a $project stage to rename the fields and remove the _id field
    {
      $project: {
        _id: 0,
        itemName: "$_id",
        quantitySold: "$qty",
        totalRevenue: "$price",
        createdAt: 1,
      },
    },
  ]);

  res.json({
    salesItemsArray,
  });
});

//@des get configs
//@route GET  /api/status
//@access Public

const getAnnualRevenue = asyncHandler(async (req, res) => {
  const now = new Date();
  const twelveMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 11, 1);

  const monthlyRevenue1 = [];

  for (let d = twelveMonthsAgo; d <= now; d.setMonth(d.getMonth() + 1)) {
    const monthStart = new Date(d.getFullYear(), d.getMonth(), 1);
    const monthEnd = new Date(d.getFullYear(), d.getMonth() + 1, 1);

    const currentMonthOrders = await Order.find({
      createdAt: {
        $gte: monthStart,
        $lt: monthEnd,
      },
    });

    const currentMonthTotal = currentMonthOrders.reduce(
      (acc, order) => acc + order.subTotal,
      0
    );
    monthlyRevenue1.push({
      month: d.toLocaleString("default", { month: "short", year: "numeric" }),
      revenue: currentMonthTotal,
    });
  }

  res.json(monthlyRevenue1);
});

//@des get configs
//@route GET  /api/status
//@access Public
const getAnnualCost = asyncHandler(async (req, res) => {
  const now = new Date();

  const monthlyCost = [];
  const twelveMonthsAgo1 = new Date(now.getFullYear(), now.getMonth() - 11, 1);

  for (let d = twelveMonthsAgo1; d <= now; d.setMonth(d.getMonth() + 1)) {
    const monthStart = new Date(d.getFullYear(), d.getMonth(), 1);
    const monthEnd = new Date(d.getFullYear(), d.getMonth() + 1, 1);

    const batchCost = await Batch.find({
      createdAt: {
        $gte: monthStart,
        $lt: monthEnd,
      },
    });

    const monthTotalRevenue = batchCost.reduce(
      (acc, batch) => acc + batch.originalQty * batch.cost,
      0
    );

    monthlyCost.push({
      month: d.toLocaleString("default", { month: "short", year: "numeric" }),
      cost: monthTotalRevenue,
    });
  }

  res.json(monthlyCost);
});

//@des get configs
//@route GET  /api/status
//@access Public
const getMonthlyCost = asyncHandler(async (req, res) => {
  const currentMonthStart = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  );

  const currentMonthEnd = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0
  );

  const monthlyCost = await Batch.aggregate([
    {
      $match: {
        // Match documents with a createdAt date within the current month, and that have either a materialId or a productId
        createdAt: {
          $gte: currentMonthStart,
          $lt: currentMonthEnd,
        },
        $or: [{ materialId: { $ne: null } }, { productId: { $ne: null } }],
      },
    },
    {
      $group: {
        // Group documents by the materialId and productId fields
        _id: { materialId: "$materialId", productId: "$productId" },
        // Calculate the total quantity by summing the originalQty field for each group
        totalQty: { $sum: "$originalQty" },
        // Calculate the total cost by multiplying the originalQty and cost fields for each group, and then summing the result
        totalCost: { $sum: { $multiply: ["$originalQty", "$cost"] } },
      },
    },
    {
      $project: {
        // Exclude the _id field from the result, and include the other fields as-is
        _id: 0,
        materialId: "$_id.materialId",
        productId: "$_id.productId",
        totalQty: 1,
        totalCost: 1,
      },
    },
  ]);

  const resArray = [];

  for (let i = 0; i < monthlyCost.length; i++) {
    if (monthlyCost[i].productId) {
      const product = await Product.findById(monthlyCost[i].productId).select(
        "name"
      );
      resArray.push({ product, stats: monthlyCost[i] });
    } else {
      const material = await Material.findById(
        monthlyCost[i].materialId
      ).select("name");
      resArray.push({ material, stats: monthlyCost[i] });
    }
  }

  res.json(resArray);
});



//@des get configs
//@route GET  /api/status
//@access Public
const getCostAfter = asyncHandler(async (req, res) => {
  const dates = (req.params.date).split('x')
  const startDate = new Date(dates[0]);
  const endDate = new Date(dates[1]);

 

  const monthlyCost = await Batch.aggregate([
    {
      
      $match: {
        // Match documents with a createdAt date within the current month, and that have either a materialId or a productId
        createdAt: {
          $gte: startDate, $lte: endDate
    
        },
        $or: [{ materialId: { $ne: null } }, { productId: { $ne: null } }],
      },
    },
    {
      $group: {
        // Group documents by the materialId and productId fields
        _id: { materialId: "$materialId", productId: "$productId" },
        // Calculate the total quantity by summing the originalQty field for each group
        totalQty: { $sum: "$originalQty" },
        // Calculate the total cost by multiplying the originalQty and cost fields for each group, and then summing the result
        totalCost: { $sum: { $multiply: ["$originalQty", "$cost"] } },
      },
    },
    {
      $project: {
        // Exclude the _id field from the result, and include the other fields as-is
        _id: 0,
        materialId: "$_id.materialId",
        productId: "$_id.productId",
        totalQty: 1,
        totalCost: 1,
      },
    },
  ]);

  const resArray = [];

  for (let i = 0; i < monthlyCost.length; i++) {
    if (monthlyCost[i].productId) {
      const product = await Product.findById(monthlyCost[i].productId).select(
        "name"
      );
      resArray.push({ product, stats: monthlyCost[i] });
    } else {
      const material = await Material.findById(
        monthlyCost[i].materialId
      ).select("name");
      resArray.push({ material, stats: monthlyCost[i] });
    }
  }

  res.json(resArray);
});



//@des get configs
//@route GET  /api/status
//@access Public
const getAnualProfit = asyncHandler(async (req, res) => {
  const now = new Date();
  const twelveMonthsAgo1 = new Date(now.getFullYear(), now.getMonth() - 11, 1);

  const totalRevenueLastYear = await Order.aggregate([
    {
      $match: {
        createdAt: {
          $gte: twelveMonthsAgo1,
        },
      },
    },
    {
      $group: {
        _id: null,
        totalSubTotal: { $sum: "$subTotal" },
      },
    },
  ]);


  
  const annualCost = await Batch.aggregate([
    {
      $match: {
        // Match documents with a createdAt date within the current month, and that have either a materialId or a productId
        createdAt: {
          $gte: twelveMonthsAgo1,
        },
      },
    },
    {
      $group: {
        // Group documents by the materialId and productId fields
        _id: null,
        // Calculate the total quantity by summing the originalQty field for each group
        totalQty: { $sum: "$originalQty" },
        // Calculate the total cost by multiplying the originalQty and cost fields for each group, and then summing the result
        totalCost: { $sum: { $multiply: ["$originalQty", "$cost"] } },
      },
    },
    {
      $project: {
        // Exclude the _id field from the result, and include the other fields as-is
        _id: 0,
        materialId: "$_id.materialId",
        productId: "$_id.productId",
        totalQty: 1,
        totalCost: 1,
      },
    },
  ]);

  res.json({ totalRevenueLastYear, annualCost });
});

//@des get configs
//@route GET  /api/status
//@access Public
const getMonthlyProfit = asyncHandler(async (req, res) => {
  const currentMonthStart = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  );

  const currentMonthEnd = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0
  );

  const totalRevenueLastYear = await Order.aggregate([
    {
      $match: {
        createdAt: {
          $gte: currentMonthStart,
          $lt: currentMonthEnd,
        },
      },
    },
    {
      $group: {
        _id: null,
        totalSubTotal: { $sum: "$subTotal" },
      },
    },
  ]);

  const annualCost = await Batch.aggregate([
    {
      $match: {
        // Match documents with a createdAt date within the current month, and that have either a materialId or a productId
        createdAt: {
          $gte: currentMonthStart,
          $lt: currentMonthEnd,
        },
      },
    },
    {
      $group: {
        // Group documents by the materialId and productId fields
        _id: null,
        // Calculate the total quantity by summing the originalQty field for each group
        totalQty: { $sum: "$originalQty" },
        // Calculate the total cost by multiplying the originalQty and cost fields for each group, and then summing the result
        totalCost: { $sum: { $multiply: ["$originalQty", "$cost"] } },
      },
    },
    {
      $project: {
        // Exclude the _id field from the result, and include the other fields as-is
        _id: 0,
        materialId: "$_id.materialId",
        productId: "$_id.productId",
        totalQty: 1,
        totalCost: 1,
      },
    },
  ]);

  res.json({ totalRevenueLastYear, annualCost });
});

//@des get configs
//@route GET  /api/status
//@access Public
const getProfitafter = asyncHandler(async (req, res) => {
  console.log(req.params.date)
  const dates = (req.params.date).split('x')
  const startDate = new Date(dates[0]);
  const endDate = new Date(dates[1]);
  const totalRevenueLastYear = await Order.aggregate([
    {
      $match: {
        createdAt: {
          $gte: startDate, $lte: endDate
        },
      },
    },
    {
      $group: {
        _id: null,
        totalSubTotal: { $sum: "$subTotal" },
      },
    },
  ]);


  
  const annualCost = await Batch.aggregate([
    {
      $match: {
        // Match documents with a createdAt date within the current month, and that have either a materialId or a productId
        createdAt: {
          $gte: startDate, $lte: endDate
        },
      },
    },
    {
      $group: {
        // Group documents by the materialId and productId fields
        _id: null,
        // Calculate the total quantity by summing the originalQty field for each group
        totalQty: { $sum: "$originalQty" },
        // Calculate the total cost by multiplying the originalQty and cost fields for each group, and then summing the result
        totalCost: { $sum: { $multiply: ["$originalQty", "$cost"] } },
      },
    },
    {
      $project: {
        // Exclude the _id field from the result, and include the other fields as-is
        _id: 0,
        materialId: "$_id.materialId",
        productId: "$_id.productId",
        totalQty: 1,
        totalCost: 1,
      },
    },
  ]);

  res.json({ totalRevenueLastYear, annualCost });
});

export {
  getkitchenRequestData,
  getMonthlySales,
  getAnnualRevenue,
  getAnnualCost,
  getMonthlyCost,
  getAnualProfit,
  getMonthlyProfit,
  getSalesAfter,
  getCostAfter,
  getProfitafter
};
