import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { Context } from '../context/context'
import Countup  from 'react-countup'
import Recent from '../components/Recent'
import {icons} from '../assets/asset'
import { Link } from 'react-router-dom'
const DashBoard = () => {
    const {allOrders}=useContext(Context)
    const {list}=useContext(Context)
    const {reserve}=useContext(Context)
      const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update time every second
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, []);
    
  return (
    <div>
    <div className='dashboardDiv'>
      
      <div className='ordersDiv'>
       
        <div className='orderContent'> 
        <p className='ordersTxt'> Total Orders
           </p>
          <img className='orderImg' src={icons.items} />
          </div>
        <p className='lengthTxt'> <Countup end={allOrders.length} duration={1}/></p>
      
        <p className='infoTxt'>customers total order amount </p>

      </div>
      
      <div className='modelsDiv'>
          <div className='orderContent'>
        <p className='modelTxt'> Total car Models
           </p>
           <img className='orderImg' src={icons.product} />
          </div>
        <p className='lengthModel'> <Countup end={list.length} duration={1}/></p>
        <p className='modelInfo'>total car amount found in the inventory</p>

      </div>
       <div className='modelsDiv'>
          <div className='orderContent'>
        <p className='modelTxt'> Total Reservation
           </p>
           <img className='orderImg' src={icons.reserve} />
           </div>
        <p className='lengthModel'> <Countup end={reserve.length} duration={1}/></p>
        <p className='modelInfo'>Total amount of Researvations </p>

      </div>
      
      
    </div>

    <div className='recentDiv'>
      <Recent />
    </div>
       <div className='timeDiv'>
        <p className='dateTxt'> Date
           </p>
        <p className='dayTxt'>{new Date().toDateString()}</p>
         <p className='timeTxt'>{currentTime.toTimeString()}</p>


      </div>
   

    </div>
  )
}

export default DashBoard
