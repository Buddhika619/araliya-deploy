import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
import sendEmail from '../Utils/sendEmail.js'
import cron from 'node-cron'

// @des  Fetch active products
// @route GET /api/products
// @access Public

const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pagenumber) || 1

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}
  let products = ''
  let resultCount = ''

  const filter = req.query.filter || 'createdAt'
  let sort = { createdAt: -1 }
  switch (filter) {
    case 'asc':
      sort = { price: 1 }
      break
    case 'dsc':
      sort = { price: -1 }
      break
    case 'top':
      sort = { rating: -1 }
      break
  }

  let categoryFilter = req.query.category
    ? req.query.category === 'All Products'
      ? {}
      : { category: req.query.category }
    : {}

  products = await Product.find({ ...keyword, ...categoryFilter, active: true })
    .sort(sort)
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  resultCount = await Product.countDocuments({ ...keyword, ...categoryFilter, active: true })

  let categories = await Product.distinct('category')
  console.log(categories)

  console.log(products)
  res.json({
    products,
    page,
    pages: Math.ceil(resultCount / pageSize),
    categories,
    resultCount,
  })
})

// @des  Fetch active/reorder/deactive products
// @route GET /api/products/admin
// @access admin

const getProductListAdmin = asyncHandler(async (req, res) => {
  const path = req.query.path
  let products = ''
  console.log('ddd')
  switch (path) {
    case 'active':
      products = await Product.find({ active: true })
      break

    case 'outofstock':
      // products = await Product.find({active: true, $expr:{$gt:["$reOrderLevel", "$countInStock"]}}) //out of stock if reorder level is used---dont delete this line needed for future reference
      products = await Product.find({ active: true, countInStock: 0 })
      break

    case 'deactivated':
      products = await Product.find({ active: false })
      break
  }

  //  products = await Product.find({ active: true })

  res.json({
    products,
  })
})

// @des  Fetch  single product
// @route GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found!')
  }
})

// @des  Delete a product
// @route DELETE /api/products/:id
// @access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  console.log('dang')
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json({ message: 'product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found!')
  }
})

// @des  delete multiple products
// @route Delete /api/products/delete
// @access Private/Admin
const deleteManyProducts = asyncHandler(async (req, res) => {
  //todo-----split req.headers.data by , TO mAKE AN ARRAY
  const ids = req.headers.data.split(',')
  console.log(ids)

  console.log(ids)
  if (ids.length > 0) {
    console.log(ids)
    await Product.deleteMany({
      _id: {
        $in: ids,
      },
    })
    res.json({ message: 'product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found!')
  }
})

// @des  create a product
// @route POST /api/products/
// @access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/image/sample.jpg',
    brand: 'test',
    category: 'Sample Category',
    reOrderLevel: 0,
    countInStock: 0,
    dailyCapacity: 0,
    numReviews: 0,
    description: 'sample',
    active: true,
  })

  const createProduct = await product.save()
  res.status(201).json(createProduct)
})

// @des  Update a product
// @route PUT /api/products/:id
// @access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  console.log(req.body)
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,

    dailyCapacity,
    active,
  } = req.body

  console.log(req.body)
  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock
    // product.reOrderLevel = reOrderLevel
    product.dailyCapacity = dailyCapacity
    product.active = active
    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

const updateDailyCapacity = asyncHandler(async (req, res) => {
  // await Product.updateMany({"active": true}, {"$set":{"countInStock": $dailyCapacity}});
  await Product.updateMany({ active: true }, [
    { $set: { countInStock: '$dailyCapacity' } },
    // {"$set": {"name":  "kamutha"}}
  ])
})

//first star represent a minute, seconde hour as on
//this function will run in 6.34AM everyday
cron.schedule('34 06 * * *', () => {
  updateDailyCapacity()
  console.log('brah')
})

// updateDailyCapacity()

// @des  Create new review
// @route POST /api/products/:id/reviews
// @access Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    console.log(review)
    product.reviews.push(review)
    product.numReviews = product.reviews.length
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length

    await product.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @des  Get top rated products
// @route POST /api/products/top
// @access Private
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find( {active: true}).sort({ rating: -1 }).limit(6)

  res.json(products)
})

//testing mail
const email = asyncHandler(async (req, res) => {
  try {
    await sendEmail()
    res.status(200).json({ success: true, message: 'Reset Email Sent' })
  } catch (error) {
    res.status(500)
    throw new Error('Email not sent, please try again')
  }
})

export {
  getProducts,
  getProductById,
  getProductListAdmin,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
  email,
  deleteManyProducts,
}
