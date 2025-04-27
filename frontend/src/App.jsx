
import './App.css'
import NavBar from './component/NavBar'

import { Routes, Route,useLocation} from 'react-router-dom'
import Home from './pages/Home'
import Explore from './pages/Explore'
import Appointment from './pages/Appointment'
import About from './pages/About'
import Contact from './pages/Contact'
import Rent from './pages/Rent'
import Login from './pages/Login'
import SearchBar from './component/SearchBar'
import Product from './pages/Product'
import View from './component/View'
import Cart from './pages/Cart'
import { ToastContainer } from 'react-toastify';
import Verify from './component/Verify'

const App = () => {
  const url=useLocation()
  return (
    <>
      <ToastContainer  />
    {
   url.pathname!=='/view'&&<NavBar/> 
}
    <SearchBar />
   <Routes>
    <Route path='/' element={<Home />}/>
    <Route path='/explore' element={<Explore />}/>
    <Route path='/Rent' element={<Rent />}/>
    <Route path='/appointment' element={<Appointment />}/>
    <Route path='/about' element={<About />}/>
    <Route path='/car/:carID' element={<Product />}/>
    <Route path='/contact' element={<Contact />}/>
    <Route path='/login' element={<Login />}/>
    <Route path='/view' element={<View />}/>
    <Route path='/cart' element={<Cart/>} />
    <Route path='/verify' element={<Verify/>} />
    </Routes>
   
    </>
  )
}

export default App
