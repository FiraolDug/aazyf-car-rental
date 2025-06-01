import userModel from '../models/userModel.js'
const addToCart = async (req, res) => {
    

    try{
        const {itemId,userId}=req.body
        const userData=await userModel.findById(userId)
        const cartData=await userData.cartData;
        if(cartData){
            if(cartData[itemId]){
                cartData[itemId]+=1
            }
            else{
                cartData[itemId]=1
            }
        }
        else{
            cartData={}
            cartData[itemId]=1
        }
        await userModel.findByIdAndUpdate(userId,{cartData})
        res.json({sucess:true,message:'added to cart'})


    }
    catch(error){
        res.json({sucess:false,message:error.message})
    }


}


const getCart = async (req, res) => {
    try{    
        // Extract userId from the request body
        const {userId}=req.body

        // Find the user in the database using the userId
        const userData=await userModel.findById(userId)

        // Extract cart data from the user document
        let cartData=await userData.cartData
        res.json({sucess:true,cartData})
 }
    catch(error){
        res.json({sucess:false,message:error.message})
    }
}



export { addToCart, getCart }   