import mongoose from 'mongoose'


    const userSchema=new mongoose.Schema({
        userName:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        cartData:{
            type:Object,
            default:{}
        }
    },{minimize:false} );//it make sures the mongodb mot  remove empty objects
 const userModel= mongoose.models.user || new mongoose.model('user',userSchema)

export default userModel;
