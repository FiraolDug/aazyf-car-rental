

import '../Nav.css'
import {icon} from '../assets/asset'
import { NavLink, Link } from 'react-router-dom';

const NavBar = () => {

  return (      
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
      <img className='search' src={icon.search}/>
      <Link to='/cart' className='cart'>
      <img src={icon.cart} className='cartImg' />
      <p className='count'>0</p>
      </Link>
      <Link to='/login'>
      <img className='user' src={icon.user}/>
      </Link>
      </div>
      
    </div>
  )
}

export default NavBar
