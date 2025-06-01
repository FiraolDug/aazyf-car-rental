import express from 'express'
import { getResponse } from '../controller/chatbotController.js'
const chatbotRouter=express.Router()
chatbotRouter.post('/respond',getResponse)

export default chatbotRouter