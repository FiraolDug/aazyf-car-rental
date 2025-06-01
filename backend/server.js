import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongoDB.js'
import userRouter from './route/userRoute.js'
import { adminLogin } from './controller/userController.js'
import carRouter from './route/carRoute.js'
import connectCloudinary from './config/cloudinary.js'
import cartRouter from './route/cartRoute.js'
import paymentRouter from './route/paymentRoute.js'
import reservationRouter from './route/reservationRoute.js'
import chatbotRouter from './route/chatbotRoute.js'
const app=express();
const port= 4000 //it get the port from the environment for security
connectDB()

connectCloudinary()
//middleware
app.use(express.json())//every request process using json


app.use(cors())//to acess backend from any frontend


//api endpoints
app.use('/api/user',userRouter)
app.use('/api/car',carRouter)
app.use('/api/cart',cartRouter)
app.use('/api/payment',paymentRouter)
app.use('/api/reservation',reservationRouter)
app.use('/api/chatbot',chatbotRouter)
app.get('/',(req,res)=>{
    res.send('Hello World')
})


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})