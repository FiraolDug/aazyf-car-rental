import { useCallback, useContext, useEffect, useState } from 'react'
import { Context } from '../context/context'
import PropTypes from 'prop-types'
const CartTotal = ({data}) => {
    const {cars,setShowDiscount}=useContext(Context)
  
    
    const [totalPrice,setTotalPrice]=useState(0)
    
    const calculate=useCallback(()=>{   
      let temp=totalPrice-(totalPrice*10)/100
      setShowDiscount(temp)},[totalPrice,setShowDiscount])


      const getPrice = useCallback(() => {
        const price = data.reduce((total, item) => {
          const productCopy = cars.find((product) => product._id === item._id);
          if (productCopy && productCopy.price) {
            return total + productCopy.price * item.quantity; // Multiply price by quantity
          }
          return total;
        }, 0);
        setTotalPrice(price);
      }, [cars, data]);
    
    
    useEffect(()=>{
    getPrice()
    },[getPrice])
    useEffect(()=>{
      calculate()
      },[calculate])

  return (


    
    <>
      <span>{totalPrice}</span>
    
    </>
  )
}
CartTotal.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default CartTotal

