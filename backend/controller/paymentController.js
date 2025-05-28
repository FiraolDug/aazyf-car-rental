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
        await newOrder.save(); 

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
      date: Date.now(),
    };

    const newOrder = new paymentModel(orderData);
    await newOrder.save();

    const txRef = `TX-${newOrder._id}-${Date.now()}`;

    const chapaData = {
      amount,
      currency: 'ETB',
      email: 'customer@example.com',
      first_name: address?.firstName || 'Customer',
      last_name: address?.lastName || 'User',
      tx_ref: txRef,
      callback_url: `${origin}/api/payment/verify-chapa?orderId=${newOrder._id}&userId=${userId}&tx_ref=${txRef}`,
      return_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
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
    const { orderId, tx_ref, userId } = req.query;

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
export {payWithStripe, payWithChapa,verifyChapa, verifyStripe}