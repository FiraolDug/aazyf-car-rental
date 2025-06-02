import  { useEffect, useState } from 'react'
import SideBar from './components/SideBar'
import Login from './pages/Login.jsx'
import {Routes,Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import Inventory from './pages/Inventory.jsx'
import DashBoard from './pages/DashBoard.jsx';
import Report from './pages/Report.jsx';

const App = () => {

  const [token,setToken]=useState(localStorage.getItem('token')?localStorage.getItem('token'):'')
  useEffect(()=>{
    localStorage.setItem('token',token)
  },[token])
  return (
    <div>
      <ToastContainer />
      {token===''?
        <Login setToken={setToken}/>:
        <>
        <SideBar setToken={setToken} />
        

<Routes>
        <Route path='/inventory' element={<Inventory token={token}/>}  />
        <Route path='/dashboard' element={<DashBoard token={token}/>} />
        <Route path='/' element={<Report token={token}/> } />
      </Routes>
</>
      }
    </div>
  )
}

export default App
