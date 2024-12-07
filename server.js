import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import 'dotenv/config'; // Import environment variables from .env

// App configuration
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: ['https://your-production-domain.com'], // Replace with your trusted domain(s)
}));
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded data

// Database connection
connectDB(); // Ensure this function logs errors in case of failure

// API Endpoints
app.use('/api/food/', foodRouter);
app.use('/images', express.static('uploads')); // Serve static image files
app.use('/api/user/', userRouter);
app.use('/api/cart/', cartRouter);
app.use('/api/order/', orderRouter);

// Root route
app.get('/', (req, res) => {
    res.send('API is working');
});

// Server listening
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
