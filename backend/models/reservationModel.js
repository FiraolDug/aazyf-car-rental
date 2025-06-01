import mongoose from 'mongoose'
const reservationSchema=new mongoose.Schema({
    userId:{type:String,required:true},
    pickupLocation:{type:String,required:true},
    pickupDate:{type:String,required:true},
    pickupTime:{type:String,required:true},
    dropoffDate:{type:String,required:true},
    dropoffTime:{type:String,required:true},
    
    date:{
        type:String,
        required:true
    }
})
const reservationModel=mongoose.models.reserve||new mongoose.model('reserve',reservationSchema)
export default reservationModel