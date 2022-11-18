import Order from '../models/orderModel.js'
import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'

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
  } = req.body

  console.log(location)

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order Items')
  } else {
    let checkArr = []
    for (let i = 0; i < orderItems.length; i++) {
      const product = await Product.findById(orderItems[i].product)
      if (product.countInStock >= orderItems[i].qty) {
        checkArr.push(0)
      } else {0
        checkArr.push(1)
      }
    }

    let checkSum = checkArr.reduce((acc, cv) => acc + cv, 0)

    if (checkSum < 1) {
      for (let i = 0; i < orderItems.length; i++) {
        const product = await Product.findById(orderItems[i].product)
        product.countInStock -= orderItems[i].qty
        await product.save()
      }

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
        location
      })

      const CreatedOrder = await order.save()

      res.status(201).json(CreatedOrder)
    } else {
      res.status(500)
      throw new Error('Order Failed, Please reset your cart and try again')
    }
  }
})

// @des  Get order by ID
// @route GET /api/products/:id
// @access Private

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )

  if (order) {
    console.log(order)
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @des  Update order to paid
// @route GET /api/products/:id/pay
// @access Private

const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }

    const updatedOrder = await order.save()
    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @des  GET logged in user orders
// @route GET /api/myorders
// @access Private

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 })
  res.json(orders)
})

// @des  GET all orders
// @route GET /api/orders
// @access Private/admin

const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name')
  res.json(orders)
})

// @des  Update order to delivered and paid
// @route GET /api/products/:id/pay
// @access Private/admin

const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.isDelivered = true
    order.deliveredAt = Date.now()

    const updatedOrder = await order.save()
    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
}
