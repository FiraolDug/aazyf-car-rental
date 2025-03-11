import '../Hero.css'
import HeroCar1 from './HeroCar1'
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { useEffect } from 'react';
import '../Nav.css'
const Hero = () => {
  useEffect(() => {
    const tl=gsap.timeline();
  tl.from('.heroHeading',{autoAlpha:0,y:400,duration:1.5},'-=0.5');
  tl.from('.heroTxt',{autoAlpha:0,y:400,duration:1.5},'-=0.5');
  tl.from('.heroButton',{autoAlpha:0,y:400,duration:1.5,stagger:0.2},'-=0.5');

  tl.from('.logo',{autoAlpha:0,x:-100,duration:1.5},'-=0.75');
  tl.from('.search',{autoAlpha:0,y:-100,duration:1},'-=0.75');
  tl.from('.cart',{autoAlpha:0,y:-100,duration:1},'-=0.75)');
  tl.from('.user',{autoAlpha:0,y:100,duration:1},'-=0.75');

  },[])
  return (
    <div className='heroDiv'>
      <div className='content'>
     <h2 className='heroHeading'>Rent Your Dream Car Here</h2>
     <p  className='heroTxt'>you can find more than 500 cars you can rent wether luxury,family or affordable cars </p>
     <button className='heroButton start'>Get Started</button>
     <Link to='./explore'>
     <button className='heroButton explore'>Explore</button>
     </Link>
      </div>
      <HeroCar1 />
    </div>
  )
}

export default Hero
