import {icon} from '../assets/asset.js'
import '../css/appoint.css'
import { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { Context } from '../context/context.jsx'
import Footer from '../component/Footer.jsx'
const Appointment = () => {
  const {token,backendUrl,orderData}=useContext(Context)
  const [pickupLocation, setPickupLocation] = useState('')
  const [pickupDate, setPickupDate] = useState('')
  const [pickupTime, setPickupTime] = useState('')
  const [dropoffDate, setDropoffDate] = useState('')
  const [dropoffTime, setDropoffTime] = useState('')
  const onSubmitHandler = async (event) => {
    try{
      if(!token){
        return null
      }
      event.preventDefault()
      const reserveData={
        pickupLocation,
        pickupDate,
        pickupTime,
        dropoffDate,
        dropoffTime
      }
      const response=await axios.post(backendUrl+'/api/reservation/reserve',reserveData,{headers:{token}})
      if(response.data.sucess && orderData.length>0){
        console.log(orderData)
        toast.success('Reservation Placed')
       
        
      }
      else{
        toast.error('order first')
      }

      
    }
    catch(error){
      toast.error(error.message)
    }

  }

  return (
    <>
    <form onSubmit={onSubmitHandler}>
     
      <div className='appointDiv'>
        <img className='rentImg' src={icon.backgroundImg} />
      <div className='formDiv'>
        <p className='appointParagraph'>pick-up location</p>
        <input onChange={(event)=>setPickupLocation(event.target.value)} className='pickupInput' value={pickupLocation} type='text' placeholder='enter pickup location' required />


        <div className='dateTime'>
          <div>
        <p className='appointParagraph'>pick-up Date</p>
        <input  onChange={(event)=>setPickupDate(event.target.value)}  className='pickupDate' value={pickupDate} type='date' placeholder='20/2/2025' required/>
        </div>
        <div>
        <p className='appointParagraph'>pick-up Time</p>
        <input  onChange={(event)=>setPickupTime(event.target.value)} className='pickupTime' value={pickupTime} type='time' placeholder='20/2/2025' required/>
        </div>
        </div>


        <div className='dateTime'>
          <div>
        <p className='appointParagraph'>Return-Date</p>
        <input  onChange={(event)=>setDropoffDate(event.target.value)} className='pickupDate' value={dropoffDate} type='date' placeholder='20/2/2025' required/>
        </div>
        <div>
        <p className='appointParagraph'>Return-Time</p>
        <input  onChange={(event)=>setDropoffTime(event.target.value)} className='pickupTime' value={dropoffTime} type='time' placeholder='20/2/2025' required/>
        </div>
        </div>
        <button className='submitButton' type='submit'>Reserve</button>


      </div>

      </div>
      
    </form>
    <Footer/>
    </>
  )
}

export default Appointment
