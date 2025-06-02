import React from 'react'
import '../css/dashboard.css'
import { icons } from '../assets/asset'
import { NavLink } from 'react-router-dom'
const SideBar = ({setToken}) => {
return (
    <div className='sideBarDiv'>
        <div className='navBarDiv'>
            <button onClick={()=>setToken('')} className='logoutBtn'>Logout</button>
        </div>
        <nav className='sideBar'>
        <div className='board'>
            <img className='adminImg' src={icons.admin}/>
        
        </div>
        <NavLink className='navlink' to='/dashboard' >
        <div className='dashboard'>
            <img className='dashboardImg' src={icons.dashboard}/>
            <p className='dashboardTxt'>DashBoard</p>
        
        </div>
        </NavLink>
        <NavLink className='navlink' to='/' >
        <div className='dashboard'>
            <img className='dashboardImg' src={icons.report}/>
            <p className='dashboardTxt'>Report</p>
        
        </div>
        </NavLink>

        <NavLink className='navlink' to='/inventory' >
        <div className='dashboard'>
            <img className='dashboardImg' src={icons.inventory}/>
            <p className='dashboardTxt'>Inventory</p>
        
        </div>
        </NavLink>



        </nav>
    
    </div>
)
}

export default SideBar
