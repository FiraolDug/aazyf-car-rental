import mongoose from "mongoose"
const carSchema=new mongoose.Schema({
    model:{type:String,required:true},
    licencePlate:{type:String,required:true},
    gltfFile:{type:Array,required:true},
    image:{type:Array,required:true},
    price:{type:Number,required:true},
    type:{type:String},
    subType:{type:String},
    description:{type:String,required:true},
    date:{type:Number,required:true}
})
const carModel=mongoose.models.car||mongoose.model('car',carSchema)
export default carModel