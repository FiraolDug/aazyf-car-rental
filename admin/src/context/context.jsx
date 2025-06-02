import {createContext} from 'react'


import { useState } from 'react'


export const Context=new createContext()
const ContextProvider = (props) => {
        const backend=import.meta.env.VITE_BACKEND_URL
        const [allOrders,setAllOrders]=useState([])
        const [list,setLists]=useState([])
        const [reserve,setReserve]=useState([])

    const value={
        allOrders,
        setAllOrders,
        list,
        setLists,
        reserve,
        setReserve,
        backend


    }


  return (

    <Context.Provider value={value} >
        {props.children}
    </Context.Provider>
  )
}


export default ContextProvider

