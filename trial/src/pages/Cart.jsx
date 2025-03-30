import { useCallback, useContext, useEffect, useState } from 'react'
import '../cart.css'
import { Context } from '../context/context'

const Cart = () => {

  const {cars,currency,cartItems}=useContext(Context)
  const [cartData,setCartData]=useState([])
  const [totalPrice,setTotalPrice]=useState()
  const getPrice = useCallback(() => {
    const price = cartData.reduce((total, item) => {
      const productCopy = cars.find((product) => product._id === item._id);
      if (productCopy && productCopy.price) {
        return total + productCopy.price * item.quantity; // Multiply price by quantity
      }
      return total;
    }, 0);
    setTotalPrice(price);
  }, [cars, cartData]);


useEffect(()=>{
getPrice()
},[getPrice])


  useEffect(()=>{
    let tempData=[]
    for(const item in cartItems)
    {
      tempData.push({
        _id:item,
        quantity:cartItems[item]
      })
    }

    setCartData(tempData);
 

  },[cartItems])

  return (
    <div className='shopCart'>
      <h2>Shopping Cart</h2>
    <div className='divCart'>
    <div className='cartItem'>
      {
        cartData.map((item,index)=>{
          const productCopy=cars.find((product)=>product._id===item._id);
         
          return (
    
     <div key={index} className='cartElement'>
      <img  className='cartImage' src={productCopy.image[0]} />
      <p>{currency}{productCopy.price}</p>
      <p className='modelName'>{productCopy.model}</p>
      </div>
  
          )
})}
          </div>
         
          <h2>Cart Total: <span>{currency}{totalPrice}</span></h2>
     </div>
    </div>
  )
}

export default Cart
