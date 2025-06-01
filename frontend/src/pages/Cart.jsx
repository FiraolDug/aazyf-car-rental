import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../css/cart.css'
import { Context } from '../context/context'
import { icon } from '../assets/asset'
import CartTotal from '../component/CartTotal'
import Footer from '../component/Footer'

const Cart = () => {

  const {cars,currency,cartItems,getQuantity,removeCart,setCartTotal}=useContext(Context)
  const [cartData,setCartData]=useState([])
  


  useEffect(()=>{
    if(cars.length>0){
    let tempData=[]
    for(const item in cartItems)
    {
      tempData.push({
        _id:item,
        quantity:cartItems[item]
      })
    }
   

    setCartData(tempData);
    setCartTotal(tempData)
 
  }
  },[cartItems,setCartTotal,cars])

  return (
    <>
    <div className='shopCart'>
      <h2 className='cartTxt1'>Shopping Cart</h2>
    <div className='divCart'>
    <div className='cartItem'>
      {
        cartData.map((item,index)=>{
          const productCopy=cars.find((product)=>product._id===item._id);
         
          return (
    
     <div key={index} className='cartElement'>
    
      <img   className='cartImage' src={productCopy.image[0]} />
      <div onClick={()=>removeCart(item._id,0)} className='closeDiv'>
      <img  className='cartClose' src={icon.close}/>
      </div>
      <p>{currency}{productCopy.price}</p>
      <p className='modelName'>{productCopy.model}</p>
      <p className='quantity'>Quantity:{getQuantity(item._id)}</p>
    
      </div>
  
          )
})}
          </div>
         
          <h2 className='cartTxt2'>Cart Total:{currency}{<CartTotal data={cartData} />}</h2>
          <Link to='/rent'>
          <button className='rentBtn'>Rent Now</button>
          </Link>
     </div>
   
    </div>
    <Footer />
    </>
  )
}

export default Cart
