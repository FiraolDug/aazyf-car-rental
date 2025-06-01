import '../css/explor.css'
import { useContext,useState,useEffect, useCallback } from 'react'
import {Context} from '../context/context'
import CarItem from '../component/carItem.jsx'
import Footer from '../component/Footer.jsx'
const Explore = () => {


  const {cars,search}=useContext(Context)
  const [category,setCategory]=useState([])
  const [subCategory,setSubCategory]=useState([])
  const [filter,setFilter]=useState([])
  const [sort,setSort]=useState([])



  const toggleCatagory=(event)=>{
  
   if(category.includes(event.target.value)){
    setCategory((prev)=>prev.filter((item)=>item!==event.target.value))
   }
   else{
    setCategory((prev)=>[...prev,event.target.value])

   }
   
  }


  const toggleSubCategory=(event)=>{
    if(subCategory.includes(event.target.value))
    {
      setSubCategory((prev)=>prev.filter((item)=>item!==event.target.value))
    }
    else{
      setSubCategory((prev)=>[...prev,event.target.value])
    }

  }
 



  const applyFilter=useCallback(()=>{
   let car=cars.slice()
   if(search){


    car=car.filter((item)=>item.model.toLowerCase().includes(search.toLowerCase()))}



   if(category.length>0){
   car=car.filter((item)=>category.includes(item.type))
   }
   if(subCategory.length>0){
    car=car.filter((item)=>subCategory.includes(item.subType))
   }
   setFilter(car)
   
  },[cars,category,subCategory,search])

  const applySort=useCallback(()=>{
    let car=cars.slice()
    switch(sort){
      case 'low-high':
      // Sorting cars by ascending price
       setFilter(car.sort((a,b)=>a.price-b.price))
        break
      case 'high-low':
         // Sorting cars by descending price
         setFilter(car.sort((a,b)=>b.price-a.price))
         break
      default:
        // Apply default filter if no sorting is selected
        applyFilter()
        break
    }

  },[cars,sort,applyFilter])



useEffect(()=>{
applySort()
},[applySort])
useEffect(()=>{
   applyFilter()
},[applyFilter])

  return (
    <>
    <div className='explorDiv'>
      <div className='filterBox'>
      <p className='titleText'>Filter</p>
      <div className='category'>
        <p className='categoryTxt'>Category</p>
        <div className='categoryDiv'>
             <p className='categoryText'>
            <input name='type'  onChange={toggleCatagory} type='checkbox'   value={'suv'}/>
            Suv</p>
            <p className='categoryText'>
            <input  name='type'  onChange={toggleCatagory}  type='checkbox'   value={'pickup'}/>
            PickUp</p>
            <p className='categoryText'>
            <input  name='type'  onChange={toggleCatagory}  type='checkbox'   value={'compact'}/>
            Compact</p>
            <p className='categoryText'>
            <input  name='type'  onChange={toggleCatagory}  type='checkbox'   value={'sport car'}/>
            Sport Car</p>

            
        </div>
      </div>
      <div className='type'>
        <p className='categoryTxt'>
          Type
        </p>
        <div className='typeDiv'>
          <p className='categoryText'>
            <input onChange={toggleSubCategory} type='checkbox' value='luxury' />
            Luxury
          </p>
          <p className='categoryText'>
            <input onChange={toggleSubCategory} type='checkbox' value='affordable' />
            Affordable
          </p>
        </div>

      </div>
      </div>
      <div className='contentDiv'>
      <div className='sortDiv'>
        <select onChange={(event)=>setSort(event.target.value)} className="sort">
          <option value={'random'} >price : by random</option>
          <option value={'low-high'}>price : by low-high</option>
          <option value={'high-low'}>price : by high-low</option>
        </select>

      </div>
      <div className='carDiv'>
{
  filter.map((item,index)=>(
    <CarItem key={index} name={item.model} image={item.image} price={item.price} id={item._id} />
  ))
}
      </div>
      </div>
    </div>

    <Footer />
    </>
  )
}

export default Explore
