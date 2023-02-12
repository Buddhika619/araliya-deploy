import mongoose from "mongoose";




const rawMaterialSchema = mongoose.Schema({
  
    name: {
        type: String,
        required: true,
    },
    reOrderLevel: {
        type: Number,
        required: true,
    },
    

},{
    timestamps:true
})

const Material = mongoose.model('Material', rawMaterialSchema)

export default Material