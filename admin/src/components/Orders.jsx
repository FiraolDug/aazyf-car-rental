import React from 'react'
import { useCallback } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { backend } from '../App'
import { useContext } from 'react'
import { Context } from '../context/context'
import '../css/list.css'

const Orders = () => {
   
    const {allOrders,setAllOrders}=useContext(Context)
    const fetchOrders=useCallback(async()=>{
        try{
            const response=await axios.post(backend+'/api/payment/getAllOrders')
            if(response.data.sucess)
            {
                setAllOrders(response.data.allOrders)
                console.log(allOrders.length)
             
            }
            else
            {
                console.log(response.data.message)
            }
        }
        catch(error)
        {
            console.log(error)
        }
    },[])

    useEffect(()=>{
        fetchOrders()
    },[fetchOrders])
  return (
    <div className='listDiv'>
        <p className='listTxt'>orders</p>

           <div className='detailDiv '>
            <b className='ordersTxt'>Name</b>
            <b className='ordersTxt orderPayment'>Payment Method</b>
            <b className='ordersTxt orderResult'>Order</b>
           
       
             </div>
        {
            allOrders.map((order,index)=>(
                <div className='detailDiv' key={index}>
                    
                    
                 <p className='customerName'>{order.address.firstName} {order.address.lastName}</p>
                  
                    <p className='orderPay'>{order.paymentMethod}</p>
                {order.items.map((item,index)=>{
                  if(index===order.items.length-1){
                    return <p className='orderItems' key={index}>{item.model}x{item.quantity} ${item.price} </p>

                  }
                  else{
                    return <p className='orderItems'  key={index}>{item.model}x{item.quantity} ${item.price}</p>

                  }
                })}
                </div>
                

            ))
        }
      


    </div>
  )
}

export default Orders
