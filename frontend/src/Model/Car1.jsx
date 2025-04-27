

import {Environment,OrbitControls,PerspectiveCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Model from './Model'
import  '../App.css'
const Car1 = () => {
  return (
    <div className='car1'>
      
    <Canvas  >
    <PerspectiveCamera makeDefault  position={[0, 3,10]} />
  <ambientLight intensity={10} />
  <Environment preset='city' />
  <Model scale={0.01} rotation={[0,-1.5,0]} position={[0,0,0] }/>
  <OrbitControls enableDamping enableZoom enableRotate enablePan/>
    
        </Canvas>

  
    </div>
  )
}

export default Car1
