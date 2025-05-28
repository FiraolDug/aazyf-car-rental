import {icon} from '../assets/asset.js'
import '../appoint.css'
const Appointment = () => {
  return (
    <div>
     
      <div className='appointDiv'>
        <img className='rentImg' src={icon.backgroundImg} />
      <div className='formDiv'>
        <p className='appointParagraph'>pick-up location</p>
        <input className='pickupInput' type='text' placeholder='enter pickup location' />


        <div className='dateTime'>
          <div>
        <p className='appointParagraph'>pick-up Date</p>
        <input className='pickupDate' type='date' placeholder='20/2/2025'/>
        </div>
        <div>
        <p className='appointParagraph'>pick-up Date</p>
        <input className='pickupTime' type='time' placeholder='20/2/2025'/>
        </div>
        </div>


        <div className='dateTime'>
          <div>
        <p className='appointParagraph'>Return-Date</p>
        <input className='pickupDate' type='date' placeholder='20/2/2025'/>
        </div>
        <div>
        <p className='appointParagraph'>Return-Time</p>
        <input className='pickupTime' type='time' placeholder='20/2/2025'/>
        </div>
        </div>
        <button className='submitButton'>Submit</button>
      </div>

      </div>
      
    </div>
  )
}

export default Appointment
