import express from 'express'
import { addCar,listCar, removeCar } from '../controller/carController.js'
import upload from '../middleware/multer.js'
import adminAuth from '../middleware/adminAuth.js'
const carRouter=express.Router()
carRouter.post('/add',adminAuth,upload.fields([{name:'image',maxcount:1},{name:'gltfFile',maxcount:1}]),addCar)
carRouter.get('/list',listCar)
carRouter.post('/remove',adminAuth,removeCar)

export default carRouter