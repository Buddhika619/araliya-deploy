import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
import sendEmail from '../Utils/sendEmail.js'
import cron from 'node-cron'
import Batch from '../models/batchModel.js'

// @des  Fetch active products
// @route GET /api/products
// @access Public

// const getProducts = asyncHandler(async (req, res) => {
//   const pageSize = 10
//   const page = Number(req.query.pagenumber) || 1

//   const keyword = req.query.keyword
//     ? {
//         name: {
//           $regex: req.query.keyword,
//           $options: 'i',
//         },
//       }
//     : {}

//   let products = ''
//   let resultCount = ''

//   const filter = req.query.filter
//   let sort = { createdAt: -1 }
//   switch (filter) {
//     case 'asc':
//       sort = { price: 1 }
//       break
//     case 'dsc':
//       sort = { price: -1 }
//       break
//     case 'top':
//       sort = { rating: -1 }
//       break
//   }

//   let categoryFilter = req.query.category
//     ? req.query.category === 'All Products'
//       ? {}
//       : { category: req.query.category }
//     : {}

//   products = await Product.find({ ...keyword, ...categoryFilter, active: true })
//     .sort(sort)
//     .limit(pageSize)
//     .skip(pageSize * (page - 1))

//   resultCount = await Product.countDocuments({ ...keyword, ...categoryFilter, active: true })

//   let categories = await Product.distinct('category')


// let retArray = []
// //filter inHouse and of the shelf
// let valTrue = products.filter((item) => item.type === true)
// let valFalse =products.filter((item) => item.type === false)


// // valTrue.forEach((item)=> {
// //   const batch = await Batch.find({ materialID: 6, qty: { $gt: 0 } })
// // })

// for(let i = 0; i < valFalse.length; i++){

//   const batch = await Batch.find({ productId: valFalse[i]._id, qty: { $gt: 0 } }).populate("productId").sort({createdAt: 1})

//   if(batch.length > 0) {
//     const viewObj ={
    
//       _id: batch[0].productId._id,
//       user:batch[0].productId.user,
//       name: batch[0].productId.name,
//       image: batch[0].productId.image,
//       category:  batch[0].productId.category,
//       description: batch[0].productId.description,
//       rating:batch[0].productId.rating,
//       numReviews:batch[0].productId.numReviews,
//       price:batch[0].salesPrice,
//       countInStock: batch[0].qty,
//       reOrderLevel: batch[0].productId.reOrderLevel,
//       dailyCapacity:  '',
//       active: batch[0].productId.active,
//       type:  batch[0].productId.type,
//       reviews:  batch[0].productId.reviews,
  
//   }
//  console.log(batch)
//   retArray.push(viewObj)
//   }else{
//     retArray.push(valFalse[i])
//   }
 
// }

// retArray = [...retArray, ...valTrue]




//   res.json({
//     products:retArray,
//     page,
//     pages: Math.ceil(resultCount / pageSize),
//     categories,
//     resultCount,
//   })
// })

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

  const sortOptions = {
    asc: { price: 1 },
    dsc: { price: -1 },
    top: { rating: -1 },
  }
  const filter = req.query.filter 
  const sort = sortOptions[filter] || { createdAt: -1 }

  const categoryFilter = req.query.category
    ? req.query.category === 'All Products'
      ? {}
      : { category: req.query.category }
    : {}

  const productFilter = { ...keyword, ...categoryFilter, active: true }
  const products = await Product.find(productFilter)
    .sort(sort)
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  const resultCount = await Product.countDocuments(productFilter)

  const categories = await Product.distinct('category')

  const retArray = []

  const inHouseProducts = products.filter((product) => product.type === true)
  const outOfStockProducts = []

  for (let i = 0; i < products.length; i++) {
    if (products[i].type === false) {
      const batch = await Batch.find({ productId: products[i]._id, qty: { $gt: 0 } }).populate('productId').sort({ createdAt: 1 })
      if (batch.length > 0) {
        const viewObj = {
          _id: batch[0].productId._id,
          user: batch[0].productId.user,
          name: batch[0].productId.name,
          image: batch[0].productId.image,
          category: batch[0].productId.category,
          description: batch[0].productId.description,
          rating: batch[0].productId.rating,
          numReviews: batch[0].productId.numReviews,
          price: batch[0].salesPrice,
          countInStock: batch[0].qty,
          reOrderLevel: batch[0].productId.reOrderLevel,
          dailyCapacity: '',
          active: batch[0].productId.active,
          type: batch[0].productId.type,
          reviews: batch[0].productId.reviews,
          createdAt: batch[0].productId.createdAt
        }
        retArray.push(viewObj)
      } else {
        outOfStockProducts.push(products[i])
      }
    }
  }

  let finalProducts = [...retArray, ...inHouseProducts, ...outOfStockProducts];

  if (req.query.filter) {
    switch (req.query.filter) {
      case 'dsc':
        finalProducts.sort((a, b) => b.price - a.price);
        break;
      case 'asc':
        finalProducts.sort((a, b) => a.price - b.price);
        break;
      case 'top':
        finalProducts.sort((a, b) => b.rating - a.rating);
        break;
      default:
        finalProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }
  } else {
    finalProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  res.json({
    products: finalProducts,
    page,
    pages: Math.ceil(resultCount / pageSize),
    categories,
    resultCount,
  })
})

// @des  Fetch active/reorder/deactive products
// @route GET /api/products/admin
// @access admin

const getProductListInAdmin = asyncHandler(async (req, res) => {
  const path = req.query.path
  let products = ''

  switch (path) {
    case 'active':
      products = await Product.find({ active: true, type: true }).sort({createdAt:-1})
      break

    case 'outofstock':
      // products = await Product.find({active: true, $expr:{$gt:["$reOrderLevel", "$countInStock"]}}) //out of stock if reorder level is used---dont delete this line needed for future reference
      products = await Product.find({ active: true,  type: true, countInStock: 0 })
      break

    case 'deactivated':
      products = await Product.find({ active: false, type: true })
      break
  }

  //  products = await Product.find({ active: true })

  res.json({
    products,
  })
})


// @des  Fetch active/reorder/deactive products
// @route GET /api/products/admin
// @access admin

const getProductListOutAdmin = asyncHandler(async (req, res) => {
  const path = req.query.path
  let products = ''

  switch (path) {
    case 'active':
      products = await Product.find({ active: true, type: false }).sort({createdAt:-1})
      break

    case 'outofstock':
      // products = await Product.find({active: true, $expr:{$gt:["$reOrderLevel", "$countInStock"]}}) //out of stock if reorder level is used---dont delete this line needed for future reference
      products = await Product.find({ active: true,  type: false, countInStock: 0 })
      break

    case 'deactivated':
      products = await Product.find({ active: false, type: false })
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

    if(product.type === true){
      res.json(product)
    }else{
      const batch = await Batch.find({ productId: product._id, qty: { $gt: 0 } }).populate("productId").sort({createdAt: 1})

      if(batch.length > 0) {
        const viewObj ={
        
          _id: batch[0].productId._id,
          user:batch[0].productId.user,
          name: batch[0].productId.name,
          image: batch[0].productId.image,
          category:  batch[0].productId.category,
          description: batch[0].productId.description,
          rating:batch[0].productId.rating,
          numReviews:batch[0].productId.numReviews,
          price:batch[0].salesPrice,
          countInStock: batch[0].qty,
          reOrderLevel: batch[0].productId.reOrderLevel,
          dailyCapacity:  '',
          active: batch[0].productId.active,
          type:  batch[0].productId.type,
          reviews:  batch[0].productId.reviews,
          batchId: batch[0]._id
      
      }
      
      res.json(viewObj)
      }else{
      
       res.json(product)
      }
     
    }
    
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
    type: false,
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
    reOrderLevel,
    dailyCapacity,
    active,
    type
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
    product.reOrderLevel = reOrderLevel
    product.dailyCapacity = dailyCapacity
    product.active = active
    product.type = type
    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

const updateDailyCapacity = asyncHandler(async (req, res) => {
  // await Product.updateMany({"active": true}, {"$set":{"countInStock": $dailyCapacity}});
  await Product.updateMany({ active: true, type:true }, [
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
  getProductListInAdmin,
  getProductListOutAdmin,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
  email,
  deleteManyProducts,
}
