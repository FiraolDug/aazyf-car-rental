import reservationModel from "../models/reservationModel.js"

const setReservation=async(req,res)=>{
    try{
        const userId=req.userId
        const {pickupLocation,pickupDate,pickupTime,dropoffDate,dropoffTime}=req.body
        const date=new Date()
        const reservationData={
            userId,
            pickupLocation,
            pickupDate,
            pickupTime,
            dropoffDate,
            dropoffTime,
            date:date.toLocaleString()
        }
        const newReservation=new reservationModel(reservationData)
        await newReservation.save()
        res.json({sucess:true,message:'Reservation Created'})

    }
    catch(error){
        res.json({sucess:true,messsage:error.message})
    }

}
const getReservation=async(req,res)=>{
    try{
        const userId=req.userId
        const reservation=await reservationModel.find({userId})
        if(reservation.length>0){
            res.json({sucess:true,reservation})
        }
        else{
            res.json({sucess:false,message:'No Reservation Found'})
        }


    }
    catch(error){
        res.json({sucess:false,message:error.message})
    }

}
const getAllReservation=async(req,res)=>{
    try{
        const reservations=await reservationModel.find({})
        res.json({success:true,reservations})

    }
    catch(error){
        res.json({success:'false',message:error.message})
    }

}


export {setReservation,getReservation,getAllReservation}