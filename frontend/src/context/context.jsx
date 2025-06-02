import {createContext, useCallback, useEffect} from 'react'
import {useState} from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export const Context=new createContext()
const ContextProvider = (props) => {
  const [search,setSearch]=useState()
  const [cartItems,setCartItems]=useState({})
  const [cartTotal,setCartTotal]=useState([])
  const [showDiscount,setShowDiscount]=useState([])
  const [productItem,setProductItem]=useState([])
  const [upload,setUpload]=useState([])
  const [cars,setCars]=useState([])
  const [token,setToken]=useState('')
  const [orderData,setOrderData]=useState([])
  const navigate=useNavigate()
  const currency='$';
  const discount=10;
  const backendUrl=import.meta.env.VITE_BACKEND_URL
  

  const addToCart= async (itemId)=>{
    let cartCopy=structuredClone(cartItems)
    if(cartCopy){
    if(cartCopy[itemId])
    {
      cartCopy[itemId]+=1
    
    }
    else{
    
      cartCopy[itemId]=1
    
    }
  }
  else{
    cartCopy={}
    cartCopy[itemId]=1
  }
    setCartItems(cartCopy)
  if(token){
    try{
      await axios.post(backendUrl+'/api/cart/add',{itemId},{headers:{token}})

    }
    catch(error){
      toast.error(error.message)
    }
  }
  

  }


  const getUserCart=useCallback(async ()=>{

    try{
      const response=await axios.post(backendUrl+'/api/cart/get',{},{headers:{token}})
      if(response.data.sucess){
          setCartItems(response.data.cartData)
      }
  }
  catch(error){
      console.log(error)
      toast.error(error.message)

  }


  },[token,backendUrl])

  const getQuantity=(id)=>{
    let totalCount=0
    for(const item in cartItems)
    {
      if(cartItems[item]>0){
        if(id==item){
        totalCount+=cartItems[item]
        }
      }
    }
    return totalCount

  }



  const getCount=()=>{
    let totalCount=0
    for(const item in cartItems){
      try{
      if(cartItems[item]>0)
      {
      totalCount+=cartItems[item]
      }
    }
    catch(error){
      console.log(error)
    }
    }
    return totalCount
  }
  const removeCart=(itemId,quantity)=>{
    let cartData=structuredClone(cartItems)
    cartData[itemId]=quantity
    delete cartData[itemId]
    setCartItems(cartData)

  }


  const getCars=useCallback( async ()=>{
    try{
        const response=await axios.get(backendUrl+'/api/car/list')
        console.log(response.data);
        if(response.data.sucess){
          setCars(response.data.cars)
        }
        else{
          toast.error(response.data.message);
        }

    }
    catch(error){
      console.log(error)
      toast.error(error.message)
    }

  },[backendUrl])

  useEffect(()=>{
    if(!token && localStorage.getItem('token')){
      setToken(localStorage.getItem('token'))
    }

  },[token])
  

  useEffect(()=>{
    getCars()
  },[getCars])
  
  useEffect(()=>{
    if(token){
    getUserCart()
  }
  },[token,getUserCart])


    const value={
        currency,
        cars,
        search,
        setSearch,
        cartItems,
        addToCart,
        getCount,
        getQuantity,
        removeCart,
        cartTotal,
        setCartTotal,
        discount,
        showDiscount,
        setShowDiscount,
        setCartItems,
        productItem,
        setProductItem,
        backendUrl,
        upload,
        setUpload,
        navigate,
        token,
        setToken,
        orderData,
        setOrderData


    }


  return (

    <Context.Provider value={value} >
        {props.children}
    </Context.Provider>
  )
}
ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ContextProvider

