import { useCallback, useContext, useEffect } from "react"

import { useSearchParams } from "react-router-dom"
import { toast } from "react-toastify"
import axios from 'axios'
import { Context } from "../context/context"


const Verify = () => {
const {navigate,token,setCartItems,backendUrl}=useContext(Context)
const [searchParams]=useSearchParams()

const success=searchParams.get('success')
const orderId=searchParams.get('orderId')
const tx_ref = searchParams.get('tx_ref'); 
console.log(orderId,tx_ref)
const verifyPayment=useCallback( async ()=>{
    try{
        if(!token){
            return null
        }
        if(!tx_ref){
        const response=await axios.post(backendUrl+'/api/payment/verify',{orderId,success},{headers:{token}})

        if(response.data.success){
         
            setCartItems({})
            navigate('/order')
        }
        else{
            navigate('/cart')
        }
    }
    else{
           const response=await axios.post(backendUrl+'/api/payment/verify-chapa',{orderId,success,tx_ref},{headers:{token}})

        if(response.data.success){
         
            setCartItems({})
            navigate('/order')
        }
        else{
            navigate('/cart')
        }
    }
    }    catch(error){
        console.log(error)
        toast.error(error.message)
    }

 },[backendUrl,token,orderId,success,navigate,setCartItems,tx_ref])
 useEffect(()=>{
    verifyPayment()
 },[verifyPayment])
    return (
    <div>
      
    </div>
  )
}

export default Verify

