import  { useState,useContext } from 'react'
import '../css/login.css'
import { toast } from 'react-toastify'
import axios from 'axios'
import { Context } from '../context/context'
const Login = ({setToken}) => {

     const {backend}=useContext(Context)
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const submitHandler=async (event)=>{
    try{
        event.preventDefault()
        const response=await axios.post(backend+'/api/user/admin',{email,password})
        if(response.data.sucess){
            setToken(response.data.token)
        }
        else{
            toast.error(response.data.message)
        }
    }
    catch(error){
        console.log(error)
        toast.error(error.message)
    }}
return (

    <div>
        <div className='loginDiv'>
            <form onSubmit={submitHandler}>
            <p>Email</p>
            <input onChange={(event)=>setEmail(event.target.value)} className='input' type='email'  placeholder='enter your email' value={email} />
            <p>Password</p>
            <input onChange={(event)=>setPassword(event.target.value)} className='input' type='password'  placeholder='enter your password' value={password} />
            <button type='submit' className='loginBtn'>Login</button>
            </form>
        </div>
    </div>
)
}

export default Login
