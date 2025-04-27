import React, { useState } from 'react'
import '../css/inventory.css'
import { icons } from '../assets/asset.js'
import { backend } from '../App.jsx'
import axios from 'axios'
import { toast } from 'react-toastify'
import List from '../components/List.jsx'
const Inventory = () => {
  const [image,setImage]=useState(false)

  const [model,setModel]=useState('')
  const [licencePlate,setLicence]=useState('')
  const [type,setType]=useState('')
  const [subType,setSubType]=useState('')
  const [price,setPrice]=useState('')
  const [description,setDescription]=useState('')
  const [gltfFile,setGltf]=useState(false)
  const submitHandler= async (event)=>{
    event.preventDefault()
    try{
      const formData=new FormData();
      formData.append('model',model)
      formData.append('description',description)
      formData.append('price',price)
      formData.append('type',type)
      formData.append('subType',subType)
      formData.append('licencePlate',licencePlate)
      image&&formData.append('image',image)
      gltfFile&&formData.append('gltfFile',gltfFile)
      
      const response=await axios.post(backend+'/api/car/add',formData)
     if(response.data.sucess){
      toast.success(response.data.message)
      setModel('')
      setDescription('')
      setImage(false)
      setPrice('')

     }
     else{
      console.log('error')
     }
    }
    catch(error){
      console.log(error)

    }
  }
  return (
    <>
    <form onSubmit={submitHandler} className='inventoryDiv'>
        <div className='fileDiv'>
       
           <label htmlFor='image'>
           <p>upload png or jpg files</p>
            <img className='imgArea' src={!image?icons.uploadeImg:URL.createObjectURL(image)} />
            <input onChange={(e)=>setImage(e.target.files[0])} type='file' id='image' hidden required />
            </label>
            <p className='uploadTxt' >upload glb or gltf files</p>
            <label htmlFor='threeView'>
            <img className='threeArea' src={!gltfFile?icons.uploadeImg:icons.threeView} />
            <input onChange={(e)=>setGltf(e.target.files[0])} type='file' id='threeView' hidden  required />
            </label>
          
        </div>
        <div className='formDiv'>
          <p className='modelTxt'>Model</p>
          <input onChange={(e)=>setModel(e.target.value)} className='modelInput' type='text' required placeholder='enter the car model' />

              <div className='pricePlate'>


                  <div className='priceDiv'>
                  <p className='priceTxt'>Price</p>
                  <input  onChange={(e)=>setPrice(e.target.value)} className='priceInput' required type='number' placeholder='> 18' />
                 </div>


                 <div className='plateDiv'>
                 <p className='plateTxt'>License Plate</p>
                 <input  onChange={(e)=>setLicence(e.target.value)} className='plateInput' required type='txt' placeholder='enter the license plate' />
                </div>

                </div>
        <div className='typeSubTypeDiv'>
            <div className='typeDiv'>
                <p className='typeTxt'>Car Type</p>
                <select  onChange={(e)=>setType(e.target.value)}  className='typeSelect'>
                    <option value='suv'>suv</option>
                    <option value='compact'>compact</option>
                    <option value='pickup'>pickup</option>
                    <option value='sport car'>sport car</option>
                </select>
            </div>
            <div className='subTypeDiv'>
                <p className='subTypeTxt'>Car SubType</p>
                <select   onChange={(e)=>setSubType(e.target.value)}  className='subTypeSelect'>
                    <option value='affordable'>affordable</option>
                    <option value='luxury'>luxury</option>
                </select>
            </div>
       </div>
       <div className='descriptionDiv'>
        <p>Car Description</p>
        <textarea  onChange={(e)=>setDescription(e.target.value)} required className='textarea' type='text' placeholder='write description here' />

        </div>
        <button type='submit' className='submitBtn'>Uploade</button>

    </div>
    </form>
   
    </>
  )
}

export default Inventory
