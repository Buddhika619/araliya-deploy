import mongoose from 'mongoose'

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
        batchId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Batch',
        }
      },
    ],
    shippingAddress: {
      lineOne: { type: String, required: true },
      lineTwo: { type: String, required: true },
      lineThree: { type: String, required: true },
      phone: { type: String, required: true },
    },

    location: {
      lat: { type: Number, required: true },
      long: { type: Number, required: true },
    },
    distance: { type: Number, required: true },
    paymentMethod: {
      type: String,
      required: true,
    },
    // paymentResult: {
    //   id: { type: String },
    //   status: { type: String },
    //   update_time: { type: String },
    //   email_address: { type: String },
    // },
    subTotal: {
      type: Number,
      required: true,
      default: 0.0,
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    orderStatus: {
      type: String,
      required: true,
      default: 'pending'
    },

    deliveredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
)

const Order = mongoose.model('Order', orderSchema)

export default Order
