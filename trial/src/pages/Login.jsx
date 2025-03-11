import '../login.css'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
  const navigate = useNavigate();

  const backendUrl=import.meta.env.VITE_BACKEND_URL;
  const [currentUserState,setCurrentUserState]=useState('Sign Up');
  const [token,setToken]=useState('');
  const [userName,setUserName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  
  const onSubmitHandler=async (event)=>{
    event.preventDefault();
    try{
      if(currentUserState==='Sign Up'){
        const response=await axios.post(backendUrl + '/api/user/register',{userName,email,password});
        if(response.data.sucess)
        {
          setToken(response.data.token);
          localStorage.setItem('token',response.data.token);
          toast.success('Registration sucess')
        }
        else{
          toast.error(response.data.message);
        }
      }
      else{
        const response=await axios.post( 'http://localhost:4000/api/user/login',{email,password});
        if(response.data.sucess)
        {
          setToken(response.data.token);
          localStorage.setItem('token',response.data.token);
        }
        else{
          toast.error(response.data.message);}

      }

    }
    catch(error){
     toast.error(error.message)
    }
  }
  useEffect(()=>{
    if(token){
      navigate('/')

    }
   
    
  
  },[token,navigate])
  return (
    <div className='loginDiv'>
      {currentUserState==='Login' ? <h1>Login Here</h1> : <h1>Sign Up Here</h1>}
      
      
      <form onSubmit={onSubmitHandler} className='loginForm'>
        {currentUserState==='Sign Up' ?
        <>
        <label>Username</label>
        <input  onChange={(e)=>setUserName(e.target.value)} value={userName} type='text' placeholder='Enter your Username'required />
        </>
        :null}
        <label>Email</label>
        <input onChange={(e)=>setEmail(e.target.value)} value={email} type='email' placeholder='Enter your Email' required />
        <label>Password</label>
        <input onChange={(e)=>setPassword(e.target.value)} value={password} type='password' placeholder='Enter your Password' required/>
        <div className='txtDiv'>
          {currentUserState==='Login' ?
          <p>Forget Password?</p>: <p>Already Have Account?</p>}
       
        {
          currentUserState==='Sign Up' ? <p onClick={()=>setCurrentUserState('Login')} className='txtparagraph'>Login Here</p>: <p onClick={()=>setCurrentUserState('Sign Up')} className='txtparagraph'>Create an Account</p>
        }
        </div>
        <button type='submit' className= 'loginBtn'>{currentUserState === 'Login'? 'Sign In':'Sign Up'}</button>
      </form>
    </div>
  )
}

export default Login
