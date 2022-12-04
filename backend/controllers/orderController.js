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
    distance,
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
      } else {
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
        location,
        distance,
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
  const user = req.user

  //check order belong to the user
  const order = await Order.findById(req.params.id)
    .populate('user', 'name email')
   

  if (
    user.isAdmin ||
    user.role === 'Rider' ||
    order.user._id.toString() === user._id.toString()
  ) {
    if (order) {
      console.log(order)
      res.json(order)
    } else {
      res.status(404)
      throw new Error('Order not found')
    }
  } else {
    res.status(401)
    throw new Error('Not Authorized')
  }
})

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
  })
  res.json(orders)
})

// @des  GET all orders
// @route GET /api/orders
// @access Private/admin

const getOrders = asyncHandler(async (req, res) => {
  console.log(req.query.path)
  const path = req.query.path

  let orders = ''
  switch (path) {
    case 'neworders':
      orders = await Order.find({ orderStatus: 'pending' }).populate(
        'user',
        'id name'
      )
      break
    case 'processing':
      orders = await Order.find({ orderStatus: 'processing' }).populate(
        'user',
        'id name'
      )
      break

    case 'dispatched':
      orders = await Order.find({ orderStatus: 'dispatched' }).populate(
        'user',
        'id name'
      )
      break

    case 'completed':
      orders = await Order.find({ orderStatus: 'completed' }).populate(
        'user',
        'id name'
      )
      break
  }

  res.json(orders)
})

// @des  GET count of pending orders
// @route GET /api/orders/count
// @access Private/admin

const getCount = asyncHandler(async (req, res) => {
  const count = await Order.count({ orderStatus: 'pending' })
  res.json(count)
})

// @des  Update order to delivered and paid
// @route GET /api/products/:id/pay
// @access Private/admin

const updateOrderToDelivered = asyncHandler(async (req, res) => {
  // const order = await Order.findById(req.params.id)
  // if (order || order.status === 'dispatched') {
  //   order.isPaid = true
  //   order.paidAt = Date.now()
  //   order.deliveredBy = order.isDelivered = true
  //   order.deliveredAt = Date.now()
  //   order.orderStatus = 'completed'
  //   const updatedOrder = await order.save()
  //   res.json(updatedOrder)
  // } else {
  //   res.status(404)
  //   throw new Error('Can not comelete the order!')
  // }

  const user = req.user

  if (user.isAdmin || user.role === 'Rider') {
    const order = await Order.findById(req.params.id)
    if (order && order.orderStatus === 'dispatched') {
      order.isPaid = true
      order.paidAt = Date.now()
      order.deliveredBy = req.user._id
      order.isDelivered = true
      order.deliveredAt = Date.now()
      order.orderStatus = 'completed'
      const updatedOrder = await order.save()
      res.json(updatedOrder)
    } else {
      res.status(404)
      throw new Error('Order not found')
    }
  } else {
    res.status(403)
    throw new Error('Not Authorized')
  }
})

// @des  remove order
// @route delete /api/products/:id
// @access Private/admin & user

const removeOrder = asyncHandler(async (req, res) => {
  const user = req.user
  let order = await Order.findOne({ _id: req.params.id })

  if (user.isAdmin || order.user === user._id) {
    if (order.orderStatus === 'pending') {
      // re adding each product to stock
      for (let i = 0; i < order.orderItems.length; i++) {
        let product = await Product.findOne({
          _id: order.orderItems[i].product,
        })
        product.countInStock += order.orderItems[i].qty
        await product.save()
      }

      await order.remove()
      res.json({ message: 'order canceled' })
    } else {
      res.status(500)
      throw new Error('Oh shoot! Order is already on the way')
    }
  } else {
    res.status(404)
    throw new Error('Order not Found')
  }
})

// @des  update status
// @route put /api/updateStatus
// @access Private/admin & user

const updateStatus = asyncHandler(async (req, res) => {
  const length = req.body.ids.length
  console.log(req.body.ids)

  for (let i = 0; i < length; i++) {
    let order = await Order.findOne({ _id: req.body.ids[i] })
    // if (order.orderStatus === 'pending') {
    //   if (order) {
    //     order.orderStatus = 'processing'

    //     await order.save()

    //   } else {
    //     res.status(404)
    //     throw new Error('Order not found')
    //     break
    //   }
    // }
    if (order) {
      console.log(order.orderStatus)
      const status = order.orderStatus
      switch (status) {
        case 'pending':
          order.orderStatus = 'processing'
          await order.save()
          break
        case 'processing':
          order.orderStatus = 'dispatched'
          await order.save()
          break
      }
    } else {
      res.status(404)
      throw new Error('Order not found')
      break
    }
  }

  res.json({ message: 'order is processeing ' })
  // if (order.status === 'pending') {
  //   order.status = 'processing'
  //   const updatedOrder = await order.save()
  //   res.json({ message: 'order send to process' })
  // } else {
  //   res.status(404)
  //   throw new Error('Order not found')
  // }
})

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
}
