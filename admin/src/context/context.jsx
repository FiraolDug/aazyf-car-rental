import {createContext} from 'react'


import { useState } from 'react'


export const Context=new createContext()
const ContextProvider = (props) => {

         const [allOrders,setAllOrders]=useState([])
         const [list,setLists]=useState([])
         const [reserve,setReserve]=useState([])

    const value={
        allOrders,
        setAllOrders,
        list,
        setLists,
        reserve,
        setReserve

     

    }


  return (

    <Context.Provider value={value} >
        {props.children}
    </Context.Provider>
  )
}


export default ContextProvider

