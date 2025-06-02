import React, { useContext, useEffect } from 'react'
import { Context } from '../context/context'

import axios from 'axios'
import '../css/list.css'
import { useCallback } from 'react'
const Recent = () => {

const {reserve,setReserve,backend}=useContext(Context)
    const fetchReservations=useCallback(async ()=>{
        try{    
            const response=await axios.get(backend+'/api/reservation/getAllReservation')
            if(response.data.success){
                setReserve(response.data.reservations.reverse())
            }
            else{
                console.log('error')
            }
        
        }
        catch(error){
            console.log(error)
        
    }

},[setReserve,backend])
    useEffect(()=>{
        fetchReservations()

    },[fetchReservations])

return (
    <div className='listDiv'>
        <p className='listTxt'>Recent Reservations</p>
        
        <div className='detailDiv '>
            <b className='detailTxt'>pickup Location</b>
            <b className='detailTxt'>pickup Date</b>
            <b className='detailTxt'>pickUp Time</b>
            <b className='detailTxt'>Return Date</b>
            <b className='detailTxt'>Return Time</b>
        </div>

    {
        reserve.slice(0,2).map((item,index)=>(
            <div className='detailDiv' key={index}>
            
                <p>{item.pickupLocation}</p>
                <p>{item.pickupDate}</p>
                <p>{item.pickupTime}</p>
                <p>{item.dropoffDate}</p>
                <p>{item.dropoffTime}</p>
            
            </div>
        ))
    }
    
    </div>
)

}

export default Recent
