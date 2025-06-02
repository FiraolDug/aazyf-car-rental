import axios from 'axios'
import React, {  useContext, useEffect} from 'react'
import { toast } from 'react-toastify'

import '../css/list.css'
import { Context } from '../context/context'
import { useCallback } from 'react'
const List = () => {
    const {list,setLists,backend}=useContext(Context)
    const fetchData=useCallback(async ()=>{
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
    },[setLists,backend])

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

    },[fetchData])
  return (
    <div className='listDiv'>
        <p className='listTxt'>Uploaded Products</p>
        
        <div className='detailDiv '>
            <b className='detailTxt'>Image</b>
            <b className='detailTxt'>Model</b>
            <b className='detailTxt'>LicencePlate</b>
            <b className='detailTxt'>Price</b>
            <b className='detailTxt'>remove</b>
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
