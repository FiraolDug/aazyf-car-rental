import jwt from 'jsonwebtoken'
const authUser=async(req,res,next)=>{
    const {token}=req.headers;
    if(!token){
        return res.json({sucess:false,message:'Not Authorized'})
    }
    try{
  
        const decode=jwt.verify(token,process.env.JWT_SECRET)
        req.userId=decode.id
        next()



    }
    catch(error){
        console.log(error)
        res.json({sucess:false,message:error.message})

    }
}
export default authUser