import  { useEffect, useState } from 'react'
import SideBar from './components/SideBar'
import Login from './pages/login.jsx'
import {Routes,Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import Inventory from './pages/inventory.jsx'
import DashBoard from './pages/DashBoard.jsx';
import Report from './pages/Report.jsx';
export const backend=import.meta.env.VITE_BACKEND_URL
const App = () => {
  console.log(backend)
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
        <Route path='/report' element={<Report token={token}/> } />
      </Routes>
</>
      }
    </div>
  )
}

export default App
