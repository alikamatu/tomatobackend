import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import foodRouter from './routes/foodRoute.js'
import userRouter from './routes/userRoute.js'
import 'dotenv/config'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'



//app config
const app = express()

//middleware
app.use(express.json())
app.use(cors("*"))
app.use(express.urlencoded({ extended: true }));

//DB connection
connectDB();

//API endpoint
app.use("/api/food/", foodRouter)
app.use("/images", express.static('uploads'))
app.use("/api/user/", userRouter)
app.use("/api/cart/", cartRouter)
app.use("/api/order/", orderRouter)


const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
