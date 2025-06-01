

import { CHATBOT } from "../config/gemini.js"


const getResponse=async (req,res)=>{
    const chatbot=new CHATBOT()
    const {message,chatMessage}=req.body


    try{
        const result=await chatbot.chat(message,chatMessage)
        res.json({success:true,result})


    }
    catch(error){
        res.json({success:false,message:error.message})

    }

}
export {getResponse}