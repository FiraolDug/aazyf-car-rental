import axios from 'axios'
import React, {  useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { backend } from '../App'
import '../css/list.css'
const List = () => {
    const [list,setLists]=useState([])
    const fetchData=async ()=>{
        try{    
            const response=await axios.get(backend+'/api/car/list')
            if(response.data.sucess){
                setLists(response.data.cars)
            }
            else{
                toast.error(response.data.cars)
            }


        }
        catch(error){
            console.log(error)
            toast.error(error.message)
        }
    }

    const removeItem=async(id)=>{
        try{
            const response=await axios.post(backend+'/api/car/remove',{id})
            if(response.data.sucess){
                toast.success(response.data.message)
                fetchData()
            }
            else{
                toast.error(response.data.message)
            }

        }
        catch(error){
           toast.error(error.message)
        }
    }
    useEffect(()=>{
        fetchData()

    },[])
  return (
    <div className='listDiv'>
        <p>Uploaded Products</p>
        
        <div className='detailDiv '>
            <b>Image</b>
            <b>Model</b>
            <b>LicencePlate</b>
            <b>Price</b>
            <b>remove</b>
       </div>

       {
        list.map((item,index)=>(
            <div className='detailDiv' key={index}>
                <img className='imgArea' src={item.image[0]}/>
                <p>{item.model}</p>
                <p>{item.licencePlate}</p>
                <p>${item.price}</p>
                <p className='removeBtn' onClick={()=>removeItem(item._id)}>X</p>
            </div>
        ))
       }
      
    </div>
  )
}

export default List
