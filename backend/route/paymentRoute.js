
import express from 'express'
import authUser from '../middleware/auth.js'
import { getAllOrders, payWithChapa, payWithStripe, userOrders, verifyChapa, verifyStripe } from '../controller/paymentController.js'
const paymentRouter=express.Router()

paymentRouter.post('/stripe',authUser,payWithStripe)
paymentRouter.post('/chapa',authUser,payWithChapa)
paymentRouter.post('/verify',authUser,verifyStripe)
paymentRouter.post('/verify-chapa',authUser,verifyChapa)
paymentRouter.post('/userOrders',authUser,userOrders)
paymentRouter.post('/getAllOrders',getAllOrders)

export default paymentRouter