import mongoose from "mongoose";

const supplierlSchema = mongoose.Schema({
  
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },

    address: {
        type: String,
        required: true
    },
    contactNo: {
        type: String,
        required: true
    },
 
},{
    timestamps:true
})

const Supplier = mongoose.model('Supplier', supplierlSchema)

export default Supplier


