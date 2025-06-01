import { useContext, useState} from 'react'
import '../css/rent.css'
import { Context } from '../context/context'
import CartTotal from '../component/CartTotal'
import { icon } from '../assets/asset'
import { toast } from 'react-toastify'
import axios from 'axios'
import Footer from '../component/Footer'
const Rent = () => {
  const {cars,cartTotal,currency,discount,showDiscount,cartItems,backendUrl,token}=useContext(Context);
  const [method,setMethod]=useState('')
  const [formData,setFormData]=useState({
    firstName:'',
    lastName:'',
    email:'',
    street:'',
    city:'',
    state:'',
    zipcode:'',
    country:'',
   
  })


  const onChangeHandler=(event)=>{
    const name=event.target.name
    const value=event.target.value
    setFormData((prevState)=>({
      ...prevState,
      [name]:value
    }))

  }

  const onSubmitHandler=async(event)=>{

    event.preventDefault()
    let orderItems=[]
    try{

      for(const items in cartItems)
      {
  
     
          if(cartItems[items]>0)
          {
          const itemInfo=structuredClone(cars.find(car=>car._id===items))
          if(itemInfo){
            itemInfo.quantity=cartItems[items]
            orderItems.push(itemInfo)
          }
          }

      }
      let orderData={
        address:formData,
        items:orderItems,
        amount:120,
    }
    switch(method){
      case 'stripe':
        {
          const responseStripe=await axios.post(backendUrl+'/api/payment/stripe',orderData,{headers:{token}})
          if(responseStripe.data.success){
              const {session_url}=responseStripe.data
             window.location.replace(session_url)}
           else{
             toast.error(responseStripe.data.message)
           }

          break
        }
      case 'chapa': {
          const responseChapa = await axios.post(backendUrl+'/api/payment/chapa', orderData, {
    headers: { token }
  });
  if (responseChapa.data.success) {
    window.location.replace(responseChapa.data.session_url);
   
  } else {
    toast.error('error');
  }
  break;
}
      default:{
        break
      }
    }

  }
    catch(error){
      console.log(error)
      toast.error(error.message)
    }
      

  }


  


  return (
    <>
    <form onSubmit={onSubmitHandler} className='rentDiv'>
      <div className='infoDiv'>
        <div className='rentInfo'>
          <h1>Personal Information</h1>
          <div className='nameDiv commonDiv'>
            <div className='firstNameDiv'>
          <p>First Name</p>
          <input onChange={onChangeHandler} value={formData.firstName}  className='nameInput commonInput' type='text' placeholder='enter your First  Name' name='firstName' required/>
          </div>
          <div className='lastNameDiv'>
          <p>Last Name</p>
          <input onChange={onChangeHandler} value={formData.lastName}   className='nameInput commonInput' type='text' placeholder='enter your Last Name' name='lastName' required />
          </div>
          </div>
       
          <div className='emailDiv commonDiv'>
          <p>Email</p>
          <input onChange={onChangeHandler} value={formData.email}  className='emailInput commonInput' type='text' placeholder='enter your Email' name='email' required/>
          </div>
          <div className=' commonDiv'>
          <p>Street</p>
          <input onChange={onChangeHandler} value={formData.street}  className='streetInput commonInput' type='text' placeholder='Street' name='street' required/>
          </div>
          <div className='phoneAge'>
          <div className='cityDiv commonDiv'>
          <p>city</p>
          <input onChange={onChangeHandler} value={formData.city}  className='cityInput commonInput' type='text' placeholder='city' name='city' required/>
          </div>
          <div className='zipDiv commonDiv'>
          <p>Zip Code</p>
          <input onChange={onChangeHandler} value={formData.zipcode}  placeholder='Zip Code' className='zipInput commonInput' type='Number' name='zipcode' required/>
          </div>
          </div>
          <div className='phoneAge'>
          <div className='cityDiv commonDiv'>
          <p>State</p>
          <input onChange={onChangeHandler} value={formData.state}  className='cityInput commonInput' type='text' placeholder='state' name='state' required/>
          </div>
          <div className='zipDiv commonDiv'>
          <p>Country</p>
          <input onChange={onChangeHandler} value={formData.country}  placeholder='country' className='zipInput commonInput' type='text' name='country' required/>
          </div>
          </div>
        

        </div>
      </div>
      <div className='paymentDiv'>
        <h1>Total Due Today</h1>
        <p className='paragraph'>subtotal:</p>
        <p className='paragraph1 paragraph'>{currency}<CartTotal data={cartTotal}/></p>
    
        <p className='paragraph'>discount</p>
        <p className='paragraph2 paragraph'>{discount}%</p>
        <hr></hr>
        <p className='paragraph'>total</p>
        <p className='paragraph3 paragraph'>{currency}{showDiscount}</p>
        <div>
        <h1>Payment Method</h1>
        <div className='paymentMethodDiv'>
        <div onClick={()=>setMethod('stripe')} className={`${method==='stripe'?'stripeActive':'stripeDiv'}`} >
        <img className='stripeImg' src={icon.stripe} />
        </div>
        <div onClick={()=>setMethod('chapa')} className={`${method==='chapa'?'chapaActive':'chapaDiv'}`}>
        <img className='chapaImg' src={icon.chapa} />
        </div>
        </div>
        <button className='submitBtn'>Pay</button>
        </div>
        </div>
        </form>
       <Footer/>
       </>
  )
}

export default Rent
