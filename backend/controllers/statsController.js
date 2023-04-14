import Batch from "../models/batchModel.js";

import Order from "../models/orderModel.js";

import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

//@des get configs
//@route GET  /api/status
//@access Public

const getStats = asyncHandler(async (req, res) => {
  console.log(12)

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

  const previousMonthStart = new Date(
    new Date().getFullYear(),
    new Date().getMonth() - 1,
    1
  );
  const previousMonthEnd = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    0
  );

  // Get all users created in the current month
  const currentMonthUsers = await User.find({
    createdAt: {
      $gte: currentMonthStart,
      $lt: currentMonthEnd,
    },
  });

  // Get the number of users created in the previous month
  const previousMonthCount = await User.countDocuments({
    createdAt: {
      $gte: previousMonthStart,
      $lt: previousMonthEnd,
    },
  });

  const currentMonthCount = currentMonthUsers.length;

  const uesrPrecentageDiff = precentageHelper(
    currentMonthCount,
    previousMonthCount
  );

  //total orders this month
  // Get all users created in the current month
  const currentMonthOrderCount = await Order.find({
    createdAt: {
      $gte: currentMonthStart,
      $lt: currentMonthEnd,
    },
  });

  // Get the number of users created in the previous month
  const previousMonthOrderCount = await Order.countDocuments({
    createdAt: {
      $gte: previousMonthStart,
      $lt: previousMonthEnd,
    },
  });

  const currentMonthorderCount = currentMonthOrderCount.length;

  const orderCountPrecentageDiff = precentageHelper(
    currentMonthCount,
    previousMonthOrderCount
  );

  //total sales this month

  const currentMonthOrders = await Order.find({
    createdAt: {
      $gte: currentMonthStart,
      $lt: currentMonthEnd,
    },
  });

  const previousMonthOrders = await Order.find({
    createdAt: {
      $gte: previousMonthStart,
      $lt: previousMonthEnd,
    },
  });

  const currentMonthTotal = currentMonthOrders.reduce(
    (acc, order) => acc + order.subTotal,
    0
  );
  const previousMonthTotal = previousMonthOrders.reduce(
    (acc, order) => acc + order.subTotal,
    0
  );

  const totalSales = currentMonthTotal;

  const percentageDifferenceSales = precentageHelper(
    currentMonthTotal,
    previousMonthTotal
  );

  //total  cost

  const currentMonthcost = await Batch.find({
    createdAt: {
      $gte: currentMonthStart,
      $lt: currentMonthEnd,
    },
  });

  const previousMonthcost = await Batch.find({
    createdAt: {
      $gte: previousMonthStart,
      $lt: previousMonthEnd,
    },
  });

  const currentMonthTotalcost = currentMonthcost.reduce(
    (acc, batch) => acc + batch.originalQty * batch.cost,
    0
  );
  const previousMonthTotalcost = previousMonthcost.reduce(
    (acc, batch) => acc + batch.originalQty * batch.cost,
    0
  );

  const totalcost = currentMonthTotalcost;

  const percentageDifferenceCost = precentageHelper(
    totalcost,
    previousMonthTotalcost
  );

  //revenue by month

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
      x: d.toLocaleString("default", { month: "short", year: "numeric" }),
      y: currentMonthTotal,
    });
  }

  //latest transaction
  const latestTransactions = await Order.find()
    .select("_id subTotal user createdAt")
    .populate("user", "name email")
    .sort({ createdAt: -1 })
    .limit(10);

  // last 12 months cost

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
      x: d.toLocaleString("default", { month: "short", year: "numeric" }),
      y: monthTotalRevenue,
    });
  }


  twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

//anual total sales
const anualSales = await Order.aggregate([
  {
    $match: {
      createdAt: { $gte: twelveMonthsAgo }
    }
  },
  {
    $group: {
      _id: null,
      total: { $sum: "$subTotal" }
    }
  }
]);

console.log(anualSales)

  res.json({
    anualSales: anualSales[0].total,
    currentMonthCount,
    uesrPrecentageDiff,
    currentMonthorderCount,
    orderCountPrecentageDiff,
    percentageDifferenceSales,
    totalSales,
    totalcost,
    previousMonthTotalcost,
    percentageDifferenceCost,
    monthlyRevenue: [{id:"cost", color: "hsl(296, 70%, 50%)",data: monthlyCost},{id:"revenue", color: "#4cceac",data: monthlyRevenue1},],
    latestTransactions,
    monthlyCost,
   
  });
});

//helper function
const precentageHelper = (currentMonth, previousMonth) => {
  console.log(currentMonth);
  if (previousMonth === 0) {
    return `${(currentMonth * 100).toFixed(2)}%`;
  } else {
    return `${(((currentMonth - previousMonth) / previousMonth) * 100).toFixed(
      0
    )}%`;
  }
};

export { getStats };
