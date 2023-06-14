import Batch from "../models/batchModel.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";
import sendStatus from '../Utils/sendStatus.js'
// @des  Create new order
// @route POST /api/products
// @access Private

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    subTotal,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    location,
    distance,
  } = req.body;

  // Check if there are no order items in the request
  if (!orderItems || orderItems.length === 0) {
    res.status(400);
    throw new Error("No order Items");
  } else {
    // Create an array to store the results of stock checks for each order item
    let checkArr = [];
    // Loop through each order item
    for (let i = 0; i < orderItems.length; i++) {
      // Retrieve the product associated with the order item
      const product = await Product.findById(orderItems[i].product);
      // Check if the product is of type "inhouse" or "off the shelf"
      if (product.type === true) {
        // if "inhouse"
        // Check if there is enough stock for the requested quantity
        if (product.countInStock >= orderItems[i].qty) {
          delete orderItems[i].batchId 
          checkArr.push(0); // There is enough stock, push 0 to the check array
        } else {
          checkArr.push(1); // There is not enough stock, push 1 to the check array
        }
      } else {
        // if "off the shelf "
        // Retrieve the batch associated with the order item
        const batch = await Batch.findById(orderItems[i].batchId);
        // Check if there is enough stock for the requested quantity
        if (batch.qty >= orderItems[i].qty) {
          checkArr.push(0); // There is enough stock, push 0 to the check array
        } else {
          checkArr.push(1); // There is not enough stock, push 1 to the check array
        }
      }
    }

    // Calculate the sum of the check array
    let checkSum = checkArr.reduce((acc, cv) => acc + cv, 0);

    // If there is enough stock for all order items, update stock and create the order
    if (checkSum < 1) {
      // Loop through each order item
      for (let i = 0; i < orderItems.length; i++) {
        const product = await Product.findById(orderItems[i].product);
        if (product.type === true) {
          // type "inhouse"
          // Update the product's stock
          product.countInStock -= orderItems[i].qty;
          await product.save();
        } else {
          // type "off the shelf"
          //find the related batch Update the batch's stock
          const batch = await Batch.findById(orderItems[i].batchId);
          batch.qty -= orderItems[i].qty;
          await batch.save();
        }
      }

      console.log(orderItems)
      // Create a new order with the extracted fields
      const order = new Order({
        orderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        subTotal,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        location,
        distance,
      });

      const CreatedOrder = await order.save();

      res.status(201).json(CreatedOrder);
    } else {
      res.status(500);
      throw new Error("Order Failed, Please reset your cart and try again");
    }
  }
});

// @des  Get order by ID
// @route GET /api/products/:id
// @access Private

const getOrderById = asyncHandler(async (req, res) => {
  const user = req.user;

  // Find the order by ID and populate the user field with name and email
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  // Check if the user is an admin, rider, or the owner of the order
  if (
    user.isAdmin ||
    user.role === "Rider" ||
    order.user._id.toString() === user._id.toString()
  ) {
    // If the user is authorized, check if the order was found
    if (order) {
      console.log(order);
      res.json(order);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  } else {
    // If the user is not authorized, return a 401 error
    res.status(401);
    throw new Error("Not Authorized");
  }
});

// @des  Update order to paid
// @route GET /api/products/:id/pay
// @access Private

// const updateOrderToPaid = asyncHandler(async (req, res) => {

//   const user = req.user

//   if (user.isAdmin || user.role === 'Rider') {
//     const order = await Order.findById(req.params.id)
//     if (order) {
//       order.isPaid = true
//       order.paidAt = Date.now()
//       order.paymentResult = {
//         id: req.body.id,
//         status: req.body.status,
//         update_time: req.body.update_time,
//         email_address: req.body.payer.email_address,
//       }

//       const updatedOrder = await order.save()
//       res.json(updatedOrder)
//     } else {
//       res.status(404)
//       throw new Error('Order not found')
//     }
//   }else{
//     throw new Error('Not Authorized')
//   }

// })

// @des  GET logged in user orders
// @route GET /api/myorders
// @access Private

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({
    createdAt: -1,
  });
  res.json(orders);
});

// @des  GET all orders
// @route GET /api/orders
// @access Private/admin

const getOrders = asyncHandler(async (req, res) => {
  // Get the path query parameter from the request object
  const path = req.query.path;

  let orders = "";
  // Use a switch statement to handle different paths
  switch (path) {
    case "neworders":
      orders = await Order.find({ orderStatus: "pending" }).populate(
        "user",
        "id name"
      );
      break;
    case "processing":
      orders = await Order.find({ orderStatus: "processing" }).populate(
        "user",
        "id name"
      );
      break;

    case "dispatched":
      orders = await Order.find({ orderStatus: "dispatched" }).populate(
        "user",
        "id name"
      );

      
      break;

    case "completed":
      orders = await Order.find({ orderStatus: "completed" }).populate(
        "user",
        "id name"
      );
      break;
  }

  res.json(orders);
});

// @des  GET count of pending orders
// @route GET /api/orders/count
// @access Private/admin

const getCount = asyncHandler(async (req, res) => {
  const count = await Order.count({ orderStatus: "pending" });
  res.json(count);
});

// @des  Update order to delivered and paid
// @route GET /api/products/:id/pay
// @access Private/admin

const updateOrderToDelivered = asyncHandler(async (req, res) => {
  // Get the current user from the request object
  const user = req.user;

  // Check if the user is an admin or a rider
  if (user.isAdmin || user.role === "Rider") {
    const order = await Order.findById(req.params.id);

    // Check if the order exists and has a status of 'dispatched'
    if (order && order.orderStatus === "dispatched") {
      // Update the order fields
      order.isPaid = true;
      order.paidAt = Date.now();
      order.deliveredBy = req.user._id;
      order.isDelivered = true;
      order.deliveredAt = Date.now();
      order.orderStatus = "completed";
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  } else {
    // Return a 403 error if the user is not authorized to update the order
    res.status(403);
    throw new Error("Not Authorized");
  }
});

// @des  remove order
// @route delete /api/products/:id
// @access Private/admin & user

//@TODO- need to change this function manage both out and inhouse products
const removeOrder = asyncHandler(async (req, res) => {
  const user = req.user;
  let order = await Order.findOne({ _id: req.params.id });

  // Get the current user from the request object
  if (user.isAdmin || order.user === user._id) {
    // Check if the order is still pending
    if (order.orderStatus === "pending") {
      // re adding each product to stock
      for (let i = 0; i < order.orderItems.length; i++) {
        let product = await Product.findOne({
          _id: order.orderItems[i].product,
        });

        if (product.type === true) {
          // Increase the product's countInStock by the order quantity
          product.countInStock += order.orderItems[i].qty;
          // Save the updated product
          await product.save();
        }

        if (product.type === false) {
          console.log(order.orderItems[i].batchId)
          const batch = await Batch.findById(order.orderItems[i].batchId);
          batch.qty += order.orderItems[i].qty;
          await batch.save();
        }
      }

      // Remove the order from the database
      await order.remove();
      res.json({ message: "order canceled" });
    } else {
      res.status(500);
      throw new Error("Oh shoot! Order is already on the way");
    }
  } else {
    res.status(404);
    throw new Error("Order not Found");
  }
});

// @des  update status
// @route put /api/updateStatus
// @access Private/admin & user

const updateStatus = asyncHandler(async (req, res) => {
  // Get the length of the array of order IDs in the request body
  const length = req.body.ids.length;

  for (let i = 0; i < length; i++) {
    let order = await Order.findOne({ _id: req.body.ids[i] });

    // Check if the order was found in the database
    if (order) {
      const status = order.orderStatus;
      // Update the order status based on the current status
      switch (status) {
        case "pending":
          order.orderStatus = "processing";
          await order.save();
         
          break;
        case "processing":
          order.orderStatus = "dispatched";
          await order.save();
          await sendStatus(order, req.user.email)
          break;
      }
    } else {
      res.status(404);
      throw new Error("Order not found");
      break;
    }
  }

  res.json({ message: "order is processeing " });
});

export {
  addOrderItems,
  getOrderById,
  // updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
  removeOrder,
  updateStatus,
  getCount,
};
