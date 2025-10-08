
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/mongodb.js';
import { connectCloudinary } from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import forgotPasswordRoutes from "./routes/forgotPasswordRoutes.js";
import customerQueryRouter from './routes/customerQueryRoutes.js';
import newsletterRoutes from "./routes/newletterRoutes.js";
import plusRoutes from "./routes/plusRoutes.js"


dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

connectDB();
connectCloudinary();

app.use(express.json());
app.use(cors());

app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/api/customerquery', customerQueryRouter);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/plus", plusRoutes); 
app.use("/api/user/forgot-password", forgotPasswordRoutes);



app.get('/', (req, res) => {
  res.send('API is working ✅');
});

app.listen(port, () => {
  console.log(`🚀 Server started on PORT: ${port}`);
});
