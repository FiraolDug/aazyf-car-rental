import '../css/Hero.css'
import '../css/nav.css'
import HeroCar1 from './HeroCar1'
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { useEffect} from 'react';
import '../css/Nav.css'
import {ScrollTrigger} from 'gsap/all'
gsap.registerPlugin(ScrollTrigger)
const Hero = () => {



  useEffect(() => {
  

  const textMove=gsap.timeline()
  textMove.from('.firstHead',{x:100,duration:1.5,autoAlpha:0,ease:'power1.inout'},'-=0.5')
  textMove.from('.secondHead',{x:100,duration:1.5,autoAlpha:0,ease:'power1.inout'},'-=0.5')
  textMove.from('.heroTxt', { autoAlpha: 0, y: 100, duration: 1,ease:'power1.inout'}, '-=0.5');
  textMove.from('.heroButton', { autoAlpha: 0, y: 100, duration: 1, stagger: 0.5,ease:'power1.inout' }, '-=0.5');
   
  const carScroll=gsap.timeline(
    {
      scrollTrigger:{
        trigger:'.carView',
        start:'top+=300 center',
        end:'bottom+=1000 center',
        scrub:1,
     
        markers:false
      }
    })
    carScroll.to('.carView',{x:-400,y:790,duration:14})

  


  



  },[])

  return (
    <div className='heroDiv'>
      <div className='content'>
    <h2 className='heroHeading firstHead'>Make Your Dream True  </h2>
    <h2 className='heroHeading secondHead'>Rent car Today</h2>
    <p  className='heroTxt'>Browse 30+ luxury, sport, and affordable rentals. Fast booking, great support! </p>
    <Link to='/login'>
    <button className='heroButton start'>Get Started</button>
    </Link>
    <Link to='./explore'>
    <button className='heroButton explore'>Explore</button>
    </Link>
  
      </div>
      <div className='carView'>
      <HeroCar1 />
      </div>

  
    </div>
  )
}

export default Hero
