import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cors from 'cors';
import orderRoutes from './routes/orderRoutes.js'

dotenv.config();


const app = express();
app.use(express.json())
app.use(cors())

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use("/api/orders", orderRoutes);

mongoose.connect(process.env.MONGO_URI,{
    
})
.then (()=> console.log('MongoDB connected'))
.catch (err => console.log(err))

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})