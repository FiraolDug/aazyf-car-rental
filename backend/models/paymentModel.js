
import mongoose from "mongoose"
const paymentSchema=new mongoose.Schema({
    userId:{type:String,required:true},
    items:{type:Array,required:true},
    amount:{type:Number,required:true},
    status:{type:String,default:"pending"},
    address:{
        type:Object,
        required:true
    },
    paymentMethod:{
        type:String,
        required:true
    },
    payment:{type:Boolean,required:false,default:false},
    date:{
        type:String,
        required:true
    }
    


})

const paymentModel= mongoose.models.payment || new mongoose.model('payment',paymentSchema)
export default paymentModel