import jwt from "jsonwebtoken"


const adminAuth = (req, res, next) => {

   const {token}=req.headers
    if(!token){
         return res.json({sucess:false,message:'Not Authorized Login Again'})
    }
    try{
        const decode=jwt.verify(token,process.env.JWT_SECRET)
        if(decode!==process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD){
            return res.json({sucess:false,message:'Not Authorized Login Again'})
        }
        next()
        
    }
    catch(error){

        console.log(error)
        res.json({sucess:false,message:error.message})
    }

}
export default adminAuth