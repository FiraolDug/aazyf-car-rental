import {createContext} from 'react'
import {useState} from 'react'
import PropTypes from 'prop-types'
import {cars} from '../assets/asset'
export const Context=new createContext()
const ContextProvider = (props) => {
  const [search,setSearch]=useState()
  const [cartItems,setCartItems]=useState({})
  const addToCart= async (itemId)=>{
    let cartCopy=structuredClone(cartItems)
    if(cartCopy[itemId])
    {
      cartCopy[itemId]+=1
    }
    else{
    
      cartCopy[itemId]=1
    }
    
    setCartItems(cartCopy)
   

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
 
    const currency='$';
    const value={
        currency,
        cars,
        search,
        setSearch,
        cartItems,
        addToCart,
        getCount

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

