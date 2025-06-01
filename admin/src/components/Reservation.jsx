import React, { useContext, useEffect } from 'react'
import { Context } from '../context/context'
import { backend } from '../App'
import axios from 'axios'
const Reservation = () => {

 const {reserve,setReserve}=useContext(Context)
    const fetchReservations=async ()=>{
        try{    
            const response=await axios.get(backend+'/api/reservation/getAllReservation')
            if(response.data.success){
                setReserve(response.data.reservations)
            }
            else{
                console.log('error')
            }
        
        }
        catch(error){
            console.log(error)
          
    }

}
    useEffect(()=>{
        fetchReservations()

    },[])
   
  return (
    <div className='listDiv'>
        <p className='listTxt'>Reservations</p>
        
        <div className='detailDiv '>
            <b className='detailTxt'>pickup Location</b>
            <b className='detailTxt'>pickup Date</b>
            <b className='detailTxt'>pickUp Time</b>
            <b className='detailTxt'>Return Date</b>
            <b className='detailTxt'>Return Time</b>
       </div>

       {
        reserve.map((item,index)=>(
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

export default Reservation
