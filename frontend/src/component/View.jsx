import {Canvas} from '@react-three/fiber'
import { icon } from '../assets/asset'
import {Perf} from 'r3f-perf'
import {Leva} from 'leva'
import '../css/view.css'
import Auto from './Auto'
import { useState } from 'react'


const View = () => {
  
  const [visible,setVisible]=useState(true)

  const change=()=>{
    if(visible===true){
      setVisible(false)
    }
    else{
      setVisible(true)
    }
  }


  return (
    <>
    <div className='guideDiv'>
    <img onClick={change} className='dropImg' src={icon.drop} /> 
    <h2 className='guideTxt'> Guide</h2>
    </div>
    {
      visible?
    <div className='guide'>
      <h3> press interact to start </h3>
      <div className='guideDetail'>
        <p>Zoom </p>
        <img src={icon.scroll} />
      </div>
      <div className='guideDetail'>
        <p>Rotate</p>
        <img src={icon.left} />
      </div>
      <div className='guideDetail'>
        <p>Move </p>
        <img src={icon.right} />
      </div>

    </div>:null
}
      <Leva  />
    
      
      <Canvas className='canvas'>
      
        <Perf position={'bottom-left'}/>
      <Auto />


      </Canvas>
  </>
  
  )
}

export default View
