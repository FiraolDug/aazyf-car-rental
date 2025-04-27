
import express from 'express'
import authUser from '../middleware/auth.js'
import { payWithChapa, payWithStripe, verifyStripe } from '../controller/paymentController.js'
const paymentRouter=express.Router()
paymentRouter.post('/stripe',authUser,payWithStripe)
paymentRouter.post('/chapa',authUser,payWithChapa)
paymentRouter.post('/verify',authUser,verifyStripe)

export default paymentRouter