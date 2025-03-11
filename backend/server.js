import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongoDB.js'
import userRouter from './route/userRoute.js'
const app=express();
const port= 4000 //it get the port from the environment for security
connectDB()
//middleware
app.use(express.json())//every request process using json
app.use(cors())//to acess backend from any frontend


//api endpoints
app.use('/api/user',userRouter)
app.get('/',(req,res)=>{
    res.send('Hello World')
})


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})