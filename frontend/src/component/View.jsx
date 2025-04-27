import {Canvas, useLoader } from '@react-three/fiber'
import {OrbitControls,PerspectiveCamera, useGLTF} from '@react-three/drei'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { useContext} from 'react'
import { Context } from '../context/context'
import '../view.css'
const View = () => {
  const {productItem}=useContext(Context)



  const load=useGLTF(productItem.gltfFile[0])



  return (

      <Canvas className='canvas'>
       
        <OrbitControls />
        <PerspectiveCamera makeDefault position={[0,3,6]}  />
        <ambientLight intensity={1} />
        <directionalLight intensity={8} />
     
          <primitive object={load.scene}  scale={100} rotation={[0,-Math.PI/4,0]}/>
     
       </Canvas>
   
   
  )
}

export default View
