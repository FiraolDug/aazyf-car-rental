
import Footer from "../component/Footer"
import '../css/about.css'
import { icon } from "../assets/asset"

const About = () => {
  return (<>
    <div className='aboutDiv'>
      <img className='aboutImg' src={icon.about} />
      <div>
        <h1>About us</h1>
        <p className='aboutTxt'>
          Our System is a cutting-edge car rental platform designed to provide an effortless and immersive vehicle rental experience.
          Our system features interactive 3D car views, allowing you to explore every angle of your chosen vehicle with 360° rotation, zoom functionality, and even previews for a realistic look before booking.
          Alongside this, our chatbot offers instant support, answering questions, assisting with bookings, and providing 
          personalized recommendations—ensuring a smooth rental process from start to finish.
        </p>
        <p className='aboutTxt'>
          We cater to all your payment needs with seamless local and international options, including Stripe for card payments and Chapa for local transactions in Ethiopia. 
          Our diverse fleet ranges from affordable compacts and luxury SUVs to high-performance sports cars and rugged pickup trucks, all available at competitive rates.
          With a user-friendly interface, real-time availability checks, and 24/7 customer support, DriveEase makes renting a car simple, secure, and convenient.
          Book today and hit the road with confidence! 🚗💨

        </p>
        </div>
    </div>

<Footer/>
    </>
  )
}

export default About
