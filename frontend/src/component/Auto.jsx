
import { useFrame, useThree } from "@react-three/fiber";
import {OrbitControls,PerspectiveCamera, useGLTF} from '@react-three/drei'
import { useContext, useState} from 'react'
import { Context } from '../context/context'
import {button, useControls} from 'leva'
import '../css/view.css'
const Auto = () => {
 
  const {control}=useThree()
  const {productItem}=useContext(Context)
 
  const [isAnimating,setIsAnimating]=useState(true)
  const load=useGLTF(productItem.gltfFile[0])
  const click=()=>{
    console.log('hello')
  }
  const {intensity}=useControls({
   
      intensity:{value:5,min:0,max:10,step:0.01},
      interact:button(()=>{
         setIsAnimating(false)
         control.camera.position.set(0,0,0)
      
      }),
      auto:button(()=>{
        setIsAnimating(true)
      })
    }
    )

    
    useFrame((state)=>{
      if(isAnimating){
    const time=state.clock.elapsedTime
    state.camera.position.x=Math.sin(time/6)*7;
    state.camera.position.z=Math.cos(time/6)*7;
    state.camera.lookAt(0,0,0)}
  
  })
  return (
    <>
       <OrbitControls  />
        <PerspectiveCamera makeDefault position={[0,3,6]}  />
        <ambientLight intensity={intensity} />
        <directionalLight intensity={10}/>
         
 
          <primitive  object={load.scene} position={[0,-1,0]}  scale={170} rotation={[0,-Math.PI/4,0]} onClick={click}/>
       
    </>
  )
}

export default Auto
