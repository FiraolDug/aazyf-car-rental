import paymentModel from "../models/paymentModel.js"
import userModel from "../models/userModel.js"
import Stripe from 'stripe'

import axios from 'axios'
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
            date:new Date()

        }
        const newOrder=new paymentModel(orderData)
        await newOrder.save() 

        const line_items = items.map((item) => ({
          
            price_data: {
                currency: currency,
                product_data: {
                    name: item.model, 
                },
                unit_amount: item.price*100-item.price * 10, 
            },
            quantity: item.quantity,
        }));
        const session=await stripe.checkout.sessions.create({
            success_url:`${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${origin}/verify?success=false&orderId=${newOrder._id}`,
        
            line_items,
            mode:'payment',
            
        })
         res.json({success:true,session_url:session.url})
    }   
  
    catch(error){
        res.json({success:false,message:error.message})
    }


}

const payWithChapa = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
   const { origin } = req.headers;


    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: 'Chapa',
      payment: false,
      date: new Date(),
    };

    const newOrder = new paymentModel(orderData);
    await newOrder.save();

    const txRef = `TX-${newOrder._id}-${Date.now()}`;

    const chapaData = {
      amount,
      currency: 'ETB',
      email: address?.email || 'email@gmail.com',
      first_name: address?.firstName || 'Customer',
      last_name: address?.lastName || 'User',
      tx_ref: txRef,
      callback_url: `${origin}/api/payment/verify-chapa?orderId=${newOrder._id}&userId=${userId}&tx_ref=${txRef}`,
      return_url: `${origin}/verify?success=true&orderId=${newOrder._id}&tx_ref=${txRef}`,
      
      
    };

    const response = await axios.post(
      'https://api.chapa.co/v1/transaction/initialize',
      chapaData,
      {
        headers: {
          Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data.status === 'success') {
    
      res.json({ success: true, session_url: response.data.data.checkout_url });

    } else {
      throw new Error('Chapa transaction initialization failed');
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};
const verifyChapa = async (req, res) => {
  try {
    // Support both GET (Chapa callback) and POST (frontend)
    const method = req.method;
    let orderId, tx_ref, userId;
    

    if (method === 'POST') {
      // From frontend
      orderId = req.body.orderId;
      tx_ref = req.body.tx_ref;
      userId = req.body.userId;
    } else {
      // From Chapa callback (if ever used)
      orderId = req.query.orderId;
      tx_ref = req.query.tx_ref;
      userId = req.query.userId;
    }

    console.log('verifyChapa:', { orderId, tx_ref, userId });

    if (!tx_ref) {
      return res.status(400).json({ success: false, message: 'Missing tx_ref' });
    }

    const response = await axios.get(
      `https://api.chapa.co/v1/transaction/verify/${tx_ref}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
        },
      }
    );

    if (response.data.status === 'success') {
      await paymentModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      return res.status(200).json({ success: true, message: 'Payment successful' });
    } else {
      await paymentModel.findByIdAndDelete(orderId);
      return res.status(400).json({ success: false, message: 'Payment failed' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
const verifyStripe=async (req,res)=>{
    const {orderId,success,userId}=req.body
    try{
        if(success==='true'){
            await  paymentModel.findByIdAndUpdate(orderId,{payment:true})
            await userModel.findByIdAndUpdate(userId,{cartData:{}})
            res.json({success:true,message:'Payment Success'})
        }
        else{
            await orderModel.findByIdAndDelete(orderId)
            res.json({success:false,message:'Payment Failed'})
        }

    }
    catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }

}
const userOrders=async (req,res)=>{
    try{
        const {userId}=req.body
        const orders=await paymentModel.find({userId})
        res.json({sucess:true,orders})

    }
    catch(error){
        res.json({sucess:false,message:error.message})
    }
}

const getAllOrders=async (req,res)=>{
    try{
        const allOrders=await paymentModel.find({})
        res.json({sucess:true,allOrders})

    }
    catch(error){
        res.json({sucess:false,message:error.message})
    }
}
export {payWithStripe, payWithChapa, verifyStripe,verifyChapa,userOrders,getAllOrders}