import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    name : {
        type:String,
        required: [true, 'please enter product name'],
    },
    price : {
        type: Number,
        required: [true, 'please enter product price'],
    },
    description : {
        type:String,
       
    },
    category : {
        type:String,
        
    },
    image: { type:String,
    }
}, {timestamps: true});
const product = mongoose.model('product', productSchema)
 
export default product;