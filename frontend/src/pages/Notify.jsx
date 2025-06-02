import { useCallback, useContext, useEffect, useState } from 'react'
import '../css/notification.css'
import axios from 'axios'
import { Context } from '../context/context'
import { toast } from 'react-toastify'
import Footer from '../component/Footer'
const Notify = () => {
    const {backendUrl,token}=useContext(Context)
    const [reservationData, setReservationData] = useState([])

    const fetchReservation=useCallback( async()=>{

        try{
            const response=await axios.post(backendUrl+'/api/reservation/getReservation',{},{
                headers:{
                    token
                }
            })
            if(response.data.sucess){
            let allReservationItem=[]
            response.data.reservation.map((item)=>{
                allReservationItem.push(item)
            })
        
                setReservationData(allReservationItem.reverse())
    
            }
            else{
                console.log(response.data.message)
                toast.error(response.data.message)
            
            }

        }
        catch(error){
            console.log(error)
        }
    
    },[backendUrl,token])
    useEffect(()=>{
            fetchReservation()
        },[fetchReservation])
return (
    <>
    <div className='notifyDiv'>
        <h3 className='notifyTitle'>Reservation Details</h3>
        {
            reservationData.map((item,index)=>(
                <div key={index} className='notifyContent'>
                
                    <p className='notifyText'>Pickup Location: {item.pickupLocation}</p>
                    <p className='notifyText'>Pickup Date: {item.pickupDate}</p>
                    <p className='notifyText'>Pickup Time: {item.pickupTime}</p>
                    <p className='notifyText'>Dropoff Date: {item.dropoffDate}</p>
                    <p className='notifyText'>Dropoff Time: {item.dropoffTime}</p>
                </div>

            ))
        }
    
    </div>
    
    <Footer />
    </>
)
}

export default Notify
