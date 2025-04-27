
import express from 'express'
import authUser from '../middleware/auth.js'
import {addToCart,getCart} from '../controller/cartController.js'
const cartRouter=express.Router()

cartRouter.post('/add',authUser,addToCart)
cartRouter.post('/get',authUser,getCart)


export default cartRouter