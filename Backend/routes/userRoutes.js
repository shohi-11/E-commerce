import express from 'express';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import authMiddleware from './authMiddleware.js';

const router = express.Router();

router.post('/register',async (req , res) =>{
    try{
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({email});
        if(existingUser) return res.status(400).json ({message: 'User already exists'})
        
       
        const user = await User.create({ name, email, password }); 
        res.status(201).json({ message: 'User registered successfully',user})

    }catch(err){
        res.status(500).json({message: err.message})

    }
})

router.post('/login',async(req, res) => {
    try{
        const {email, password } = req.body;
        
        const user = await User.findOne({email})
        console.log("Login attempt:", email, user);
        if(!user) return res.status(400).json ({ message:'Invalid credentials'})
         
         const isMatch = await bcrypt.compare(password,user.password)
         console.log("Plain:", password, "Hashed:", user.password, "Match:", isMatch);
         if(!isMatch) return res.status(400).json({ message: 'Invalid credentials'})

            const token = jwt.sign(
                {id: user._id, role: user.role, name: user.name},
                process.env.JWT_SECRET,
                { expiresIn: '1h'}
            )
            res.json({ message: 'Login successful',token})

    }catch (err){
        res.status(500).json({ message: err.message})
    }
})

  router.get('/cart', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("cart.productId");
    res.json(user.cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Add to Cart
router.post('/cart', authMiddleware, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const user = await User.findById(req.user.id);

    // check if item already exists
    const existingItem = user.cart.find(
      item => item.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity; // update quantity
    } else {
      user.cart.push({ productId, quantity });
    }

    await user.save();
    res.json(user.cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Remove from Cart
router.delete('/cart/:productId', authMiddleware, async (req, res) => {
  try {
    const { productId } = req.params;
    const user = await User.findById(req.user.id);

    user.cart = user.cart.filter(item => item.productId.toString() !== productId);
    await user.save();

    res.json(user.cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;