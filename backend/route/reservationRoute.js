import express from 'express'
import authUser from '../middleware/auth.js'
import {setReservation,getReservation, getAllReservation} from '../controller/reservationController.js'
const reservationRouter=express.Router()
reservationRouter.post('/reserve',authUser,setReservation)
reservationRouter.post('/getReservation',authUser,getReservation)
reservationRouter.get('/getAllReservation',getAllReservation)
export default reservationRouter