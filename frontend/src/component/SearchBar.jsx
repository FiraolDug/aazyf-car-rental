
import '../css/search.css'
import {icon} from '../assets/asset'
import { useContext, useEffect,useState } from 'react'
import { Context } from '../context/context'
import { useLocation } from 'react-router-dom'

const SearchBar = () => {
  const {search,setSearch}=useContext(Context)
 const location=useLocation();
 const [visible,setVisible]=useState(false)
 useEffect(()=>{
if(location.pathname.includes('/explore')){
setVisible(true)
}
else{
    setVisible(false)

}
 },[location])
  return visible? (
    <div className='searchDiv'>
      <div className='searchBar'>
        <input onChange={(event)=>setSearch(event.target.value)} className='searchBox' type='text' placeholder='search' value={search}/>
        <img  className='searchIcon' src={icon.search}  />
      </div>
    </div>
  ):null
}

export default SearchBar
