

import '../Nav.css'
import {icon} from '../assets/asset'
import { NavLink, Link } from 'react-router-dom';
import {useContext, useState} from 'react'
import { Context } from '../context/context';
const NavBar = () => {
 const [visible,setVisible]=useState(false)
 const {getCount}=useContext(Context)
  return (  
    <>    
    <div className='navbar'>
     <Link to='/'>
      <img className='logo'  src={icon.logo}/>
      </Link>
      <ul className='list'>
      <NavLink className='navlink' to='/'>
      <p>HOME</p>
      <hr className='line' />
     </NavLink>
      <NavLink className='navlink' to='/explore'>
      <p>EXPLORE</p>
      <hr className='line'/>
     </NavLink>
      <NavLink className='navlink' to='/rent'>
      <p>RENT</p>
      <hr className='line'/>
      </NavLink>
      <NavLink className='navlink' to='/appointment'>
      <p>APPOINTMENT</p>
      <hr className='line'/>
      </NavLink>
      <NavLink className='navlink' to='/about'>
      <p>ABOUT</p>
      <hr className='line'/>
      </NavLink>
      <NavLink className='navlink' to='/contact'>
      <p>CONTACT</p>
      <hr className='line'/>
      </NavLink>
      </ul>
      <div className='icons'>
        <Link to='/explore'>
      <img className='search' src={icon.search}/>
      </Link>
      <Link to='/cart' className='cart'>
      <img src={icon.cart} className='cartImg' />
      <p className='count'>{getCount()}</p>
      </Link>
      <Link to='/login'>
      <img className='user' src={icon.user}/>
      </Link>
      
     <img className='menuImg' onClick={()=>{setVisible(true)}} src={icon.menu}/>
      
     
      </div>
      
   
    </div>

    { visible===true ?
         <div className='mobileDiv'>
         <img className='menuImg'   onClick={()=>{setVisible(false)}} src={icon.back} />
         
        <Link onClick={()=>{
          setVisible(false)
        }} className='mobileHeading' to='/'>
        <h1 >Home</h1></Link>
        
        <Link  onClick={()=>{
          setVisible(false)
        }} className='mobileHeading' to='/explore'>
        <h1 >Explore</h1></Link>
        
        <Link  onClick={()=>{
          setVisible(false)
        }} className='mobileHeading' to='/rent'>
        <h1 >Rent</h1></Link>
        
        <Link  onClick={()=>{
          setVisible(false)
        }} className='mobileHeading' to='/appointment'>
        <h1 >Appointment</h1></Link>
        
        <Link  onClick={()=>{
          setVisible(false)
        }} className='mobileHeading' to='/about'>
        <h1 >About</h1></Link>
         
        <Link  onClick={()=>{
          setVisible(false)
        }} className='mobileHeading' to='/contact'>
        <h1 >Contact</h1></Link>
        </div>
        : null
    }
 
 </>
  )
}

export default NavBar
