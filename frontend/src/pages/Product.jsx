import '../css/product.css' 
import {cars1, icon} from '../assets/asset'
import { Link,useParams } from 'react-router-dom'
import { Context } from '../context/context'
import { useCallback, useContext,useEffect,useState } from 'react'
import Footer from '../component/Footer'
const Product = () => {
  const {cars,currency,addToCart,productItem,setProductItem,setUpload}=useContext(Context)

  const [img,setImg]=useState([])
  const {carID}=useParams()
 

const fetchData=useCallback( async ()=>{
  cars.map((item)=>{
    if(item._id==carID){
     
      setProductItem(item)
   
      setImg(item.image[0])
      return null
    }
  })
  cars1.map((item)=>{
    if(item._id==carID){
     
      setUpload(item)
    
      setImg(item.image[0])
      return null
    }
  })

},[setUpload,cars,carID,setProductItem])


  useEffect(()=>{
    fetchData()
  },[fetchData])
  
  return (
    <>
    <div className='productDiv'>

      <div className='options'>
         <div className='cartDiv'>
        <h1 className='model'>{productItem.model}</h1>
          <h3 className='price'>{currency}{productItem.price}</h3>
          <p>{productItem.description}</p>
     
       
            <button onClick={()=>addToCart(productItem._id)} className='cartBtn'>Add to Cart</button>
       
      
          </div>
             <div className='threeView'> 
        <h3>change View</h3>
        <Link to='/view'>
          <div className='divImg'>
          <img className='viewImg' src={icon.view}/>
          </div>
         
         </Link>
       </div>
      
      
      </div>


      <div className='product'>
        <img className='productImg' src={img} alt='here is the image' />
      </div>
          
     


 

    </div>
    <Footer />
    </>
  )
}

export default Product
