import {useAnimations, useGLTF } from "@react-three/drei"

import { icon } from "../assets/asset"
import { useEffect } from "react"

const ChatbotView = () => {
    const load=useGLTF(icon.glb.file3)
   
    const animation=useAnimations(load.animations,load.scene)
    useEffect(()=>{
       
        const action1=animation.actions.animation1
         const action2=animation.actions.KeyAction
     
        action1.play()
        action2.play()
   
    },[animation.actions.KeyAction,animation.actions.animation1])

  return (

        <> 
            <perspectiveCamera position={[0,0,0]} />
            <ambientLight intensity={1} />
            <primitive object={load.scene} scale={1} position={[-1,-2,-4]} rotation={[0.2,0,0]} />
            <directionalLight intensity={1} />
        </>
      

  )
}

export default ChatbotView
