import paymentModel from "../models/paymentModel.js"
import userModel from "../models/userModel.js"
import Stripe from 'stripe'
const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)
const currency='usd'
const payWithStripe= async (req,res)=>{

    try{
        const {userId,items,amount,address}=req.body
        const {origin}=req.headers
        const orderData={
            userId,
            items,
            address,
            amount,
            paymentMethod:'Stripe',
            payment:false,
            date:Date.now()

        }
        const newOrder=new paymentModel(orderData)
        await newOrder.save() 

        const line_items = items.map((item) => ({
          
            price_data: {
                currency: currency,
                product_data: {
                    name: item.model, 
                },
                unit_amount: item.price * 100, 
            },
            quantity: item.quantity,
        }));
        const session=await stripe.checkout.sessions.create({
            success_url:`${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode:'payment',
        })
         res.json({sucess:true,session_url:session.url})
    }   
  
    catch(error){
        res.json({sucess:false,message:error.message})
    }


}
const payWithChapa= async (req,res)=>{


}
const verifyStripe=async (req,res)=>{
    const {orderId,success,userId}=req.body
    try{
        if(success==='true'){
            await  paymentModel.findByIdAndUpdate(orderId,{payment:true})
            await userModel.findByIdAndUpdate(userId,{cartData:{}})
            res.json({sucess:true,message:'Payment Success'})
        }
        else{
            await orderModel.findByIdAndDelete(orderId)
            res.json({sucess:false,message:'Payment Failed'})
        }

    }
    catch(error){
        console.log(error)
        res.json({sucess:false,message:error.message})
    }

}
export {payWithStripe, payWithChapa, verifyStripe}