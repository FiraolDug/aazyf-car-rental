import { useCallback, useContext, useEffect } from "react";
import { Context } from "../context/context";
import axios from "axios";
import '../css/order.css'
import { Link } from "react-router-dom";
import Footer from "../component/Footer";



const Order = () => {
    const {backendUrl,token,currency,orderData,setOrderData}=useContext(Context);
  
    const loadOrderData=useCallback( async ()=>{
      try{
        if(!token){
          return null
        }
        const response=await axios.post(backendUrl+'/api/payment/userOrders',{},{
          headers:{
            token    
          }
        })
        if(response.data.sucess){
          let allOrdersItem=[]
          response.data.orders.map((order)=>
        { 
          order.items.map((item)=>{
          item['status']=order.status
          item['payment']=order.payment
          item['paymentMethod']=order.paymentMethod
          item['date']=order.date
          allOrdersItem.push(item)
        }) 
        } 
      )
  
      setOrderData(allOrdersItem.reverse() )
    }
      }
      catch(error){
        console.log(error)
      }
    },[backendUrl,token,setOrderData])
    useEffect(()=>{
      loadOrderData() },[loadOrderData])
  return (
<>
    <div className='orderDiv'>
        <h3>Your Orders</h3>
      {
      orderData.slice(0,5).map((item,index)=>(
        <div className='orderContent' key={index} >

        <div >
          <img className='orderImg'  src={item.image} />
          </div>

        <div>
          <p >Model:{item.model}</p>
          <div >
          <p>Price:{currency}{item.price-item.price/10}</p>
          <p>Quantity:{item.quantity}</p>
        
            </div>
            <p >Date:<span  >{new Date(item.date).toDateString()}</span></p>
            <p >Payment:<span >{item.paymentMethod}</span></p>
          </div>

            <div >
    
            <p >{item.status}</p>
    
            </div>

            <div className='orderBtnDiv'>
              <Link to='/appointment'>
              <button className='orderBtn'>Make Appointment</button>
              </Link>
            </div>


          </div>
      ))
    }
    </div>
    <Footer />
    </>
  )
}

export default Order
