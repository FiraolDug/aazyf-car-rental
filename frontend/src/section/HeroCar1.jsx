import { Canvas } from '@react-three/fiber'
import {icon} from '../assets/asset.js'
import { PerspectiveCamera, useGLTF } from '@react-three/drei'
import '../css/Hero.css'


const HeroCar1 = () => {
  const load=useGLTF(icon.glb.file2)

  return (

      <Canvas className='canvasView'>

  
        <PerspectiveCamera makeDefault position={[0,3,6]} />
        <ambientLight intensity={5} />
        <directionalLight intensity={2} />
        <primitive object={load.scene} scale={1} position={[1.5,2.2,-0.5]} rotation={[0.2,3.6,0]} />

      </Canvas>
  
  )
}



export default HeroCar1

