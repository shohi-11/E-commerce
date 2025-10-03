import mongoose from "mongoose";
import bcrypt from 'bcryptjs';


// Define schema for items inside cart
const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",  // reference to Product model
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, 'Please enter your name'],
    },
    email:{
        type:String,
        required: [true, 'Please enter your email'],
        unique: true,
    },
    password:{
        type:String,
        required: [true, 'Please enter your password'],
    },
    role:{
        type:String,
        enum: ['user','admin'],
        default: 'user'
    },
    cart: [cartItemSchema]   // ✅ NEW FIELD

},{ timestamps: true})

userSchema.pre('save',async function (next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

const User = mongoose.model('User', userSchema);
export default User;