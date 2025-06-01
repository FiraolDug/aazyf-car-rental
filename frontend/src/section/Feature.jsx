import { Canvas } from '@react-three/fiber'
import { icon } from '../assets/asset'

import '../css/feature.css'
import ChatbotView from './ChatbotView'

const Feature = () => {
  return (
    <>
    <div className='featureSection'>

    <div className='detailDiv'>
      <div className='viewType commonItem'>
         <img className='threeImg' src={icon.three} />
        <h4 >View Cars in 3D</h4> 
       
        <p>Go beyond photos—interact with true-to-life 3D models for a dealership-level experience at home.</p>
        </div>
      <div className='zoomDiv commonItem'>
        <img className='threeImg' src={icon.zoom} />
         <h4>Zoom to See Details</h4> 
        <p>Get up close with pinch-to-zoom: inspect the gloss of the paint or the texture of the upholstery.</p>
         </div>
       <div className='allDiv commonItem'>
        <img className='threeImg' src={icon.rotate} />
        <h4>Navigate 360°</h4>
        <p>View it from every angle: rotate and explore as if you’re walking around it in a showroom.</p>
         </div>
       <div className='immersiveDiv commonItem'>
        <img className='threeImg' src={icon.ar} />
          <h4> Immerse Yourself</h4>
          <p>Experience the thrill of being there: the ambiance, the details, without leaving home.</p>
         </div>
    </div>

    <div className='backgroundDiv'> 
      <div className='chatContainer'>
    <div className='chatbotView'>
      <h2>chatbot support</h2>
      <p>Whether its rentals, bookings, or payments, just ask—our chatbot has you covered.</p>
    </div>
     <div className='chatbotView'>
      <h2>24/7 Availability</h2>
      <p>Need a last-minute booking or payment help? We’re here nonstop—just send a message!.</p>
    </div>
     <div className='chatbotView'>
      <h2>easy search</h2>
      <p>Just tell chatbot what you need, and get the best options. Try it now.</p>
    </div>
    </div>
    <div className='chatbotModel'>
      <Canvas className='chatCanvas'>
           <ChatbotView />
      </Canvas>
    </div>
    </div>

    <div className='service'>
   <h1 className='serviceTxt'>Explore  Our Services </h1>
    <div className='serviceDiv'>  
   
      <div className='serviceItem'>
        <img className='serviceImg' src={icon.chapa} />
        <h1>Rental Car</h1>
        <p>Flexible rentals for every need, from quick trips to long-term journeys.</p>
      </div>
      <div className='serviceItem'>
        <img className='serviceImg' src={icon.chatbot} />
        <h1>Rental Car</h1>
        <p>Flexible rentals for every need, from quick trips to long-term journeys.</p>
    
      </div>
      <div className='serviceItem'>
        <img className='serviceImg' src={icon.stripe} />
        <h1>Rental Car</h1>
        <p>Flexible rentals for every need, from quick trips to long-term journeys.</p>
      </div>
    </div>
    </div>
    </div>

</>
  )
}

export default Feature
