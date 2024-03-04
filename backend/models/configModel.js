import mongoose from "mongoose";

const configSchema = mongoose.Schema({
  carousel: [
    {
      type: String,
      required: true,
    },
  ],
  offers: [
    {
      exDate: {
        type: Date,
      },
      text: {
        type: String,
      },
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },

      image: { type: String },
      description: { type: String },
      price: { type: String,  },
      name: { type: String },
    },
  ],
});

// configSchema.pre('save', async function (next) {

//   this.productId = await mongoose.Types.ObjectId(this.productId)
// })

const Config = mongoose.model("Config", configSchema);

export default Config;
