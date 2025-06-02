import { useContext, useState } from 'react'
import { icon } from '../assets/asset'
import '../css/chatbot.css'
import axios from 'axios'
import { Context } from '../context/context'
import { toast } from 'react-toastify'
const Chatbot = () => {
  const {backendUrl}=useContext(Context)
  const [popup,setPopup]=useState(false)
  const [message,setMessage]=useState('')
  const [chatMessage,setChatMessage]=useState(
    [
      {
        role:'assistant',
        content:'hey there! what can i help you today'
      }
    ]
  )

  const onSubmitHandler=async (event)=>{
    event.preventDefault()
    sendMessage()
    if(event.key==='Enter' && message.trim()){
      addMessage({role:'user',content:message})
      setMessage('')

      event.preventDefault()
    }

    
  
    try{

      const response=await axios.post(backendUrl+'/api/chatbot/respond',{chatMessage,message})
      if(response.data.success){
        toast.success('message sent')
      const responseData=response.data.result
  
      addMessage({content:responseData,role:'assistant'})
  
      }
      else{
        toast.error(response.data.message)
      }
    }
    catch(error){
      console.log(error)
      toast.error(error.message)
    }

  }
  
  const changeState=()=>{
   
  if(popup===true){
  setPopup(false)}
  else{
  setPopup(true)
  }
  } 

  const addMessage= (message)=>{
    setChatMessage((prev)=>[...prev,message])
  }

  const enterMessage=(event)=>{
    if(event.key==='Enter' && message.trim()){
      addMessage({role:'user',content:message})
      setMessage('')

      event.preventDefault()
    }}

    const sendMessage=async ()=>{
      
      
      if(message.trim()){
        setMessage('')

        addMessage({role:'user',content:message})
        
      }
    
    }
   
   
  
  return (
    <>
    <form onSubmit={onSubmitHandler} className={`${popup?'chatbotDiv':'disable'}`}>
        <div className='chatHeader'>
            <img className='chatbotImg' src={icon.chatbot} />
            <h2 className='chatTitle'>ChatBot </h2>
        </div>
        
        <div className="chatBody">
        {chatMessage.map(({ role, content }, index) => (
        role === 'assistant' ? (
            <div key={index} className="chatDiv">
                <img className="chatImg" src={icon.chatbot} alt="Assistant" />
                <p className="chatTxt">{content}</p>
            </div>
        ) : (
            <div key={index} className="userDiv">
                <p className="userTxt">{content}</p>
            </div>
        )
    ))}
        </div>

        
        <div className='sendMessage'>
          <textarea onKeyDown={enterMessage} onChange={(event)=>setMessage(event.target.value)} value={message} className='messageInput' placeholder='write message' required />
          <button  className='sendBtn' type='submit'>
          <img className='sendImg' src={icon.send} />
          </button>
        </div>

      </form>

    <div className='btnDiv'>
    <button onClick={changeState} className='chatbotBtn'><img className='imgBtn' src={popup?icon.closeChatbot:icon.message}/></button>
    </div>
    </>
  )
}

export default Chatbot
