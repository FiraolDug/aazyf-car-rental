import userModel from '../models/userModel.js'
import validator from 'validator'
import jwt from 'jsonwebtoken'
import bycrypt from 'bcrypt'

const createToken=(id)=>{  
    return jwt.sign({id},process.env.JWT_SECRET) 
}
const loginUser=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await userModel.findOne({email});
        if(!user){
            return res.json({sucess:false,message:"User does not found"});
        }
        const isMatch=await bycrypt.compare(password,user.password);
        if(isMatch){
            const token=createToken(user._id);
            res.json({sucess:true,token})
        }
        else{
            res.json({sucess:false,message:"Invalid Credentials"});
        }
    }
    catch(error){
        console.log(error)
        res.json({sucess:false,message:error.message})
    }


}

const registerUser=async(req,res)=>{

    try{
        const {userName,email,password}=req.body;
        console.log(userName)

        //checking if user already exist
        const exists= await userModel.findOne({email});
        if(exists){
           return  res.json({sucess:false,message:"User already exists"});
        }
        //validate the credentail
        if(!validator.isEmail(email)){
            return res.json({sucess:false,message:"Please Enter a Valid Email"});
        }
        if(password.length<8){
            return res.json({sucess:false,message:"Password must be atleast 8 characters"});
        }

        //hashing and salting password
        const salt=await bycrypt.genSalt(5)
        const hashedPassword=await bycrypt.hash(password,salt);
        const newUser=new userModel({
            userName:userName,
            email:email,
            password:hashedPassword
        });
        const user=await newUser.save();

        //create token to make user enter to the web with its token
        const token=createToken(user._id);
        res.json({sucess:true,token:token});

    }
    catch(error){
        console.log(error);
        res.json({sucess:false,message:error.message});
    }
}

const adminLogin=async(req,res)=>{
    try{
        const {email,password}=req.body
        if(email===process.env.AdMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
            const token=jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({sucess:true,token})
        }
        else{
            res.json({sucess:false,message:'invalid credentials'})
        }


    }
    catch(error){
        console.log(error)
        res.json({sucess:false,message:error.message})
    }

}







export {loginUser,registerUser,adminLogin}