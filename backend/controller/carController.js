import carModel from "../models/carModel.js"
import {v2 as cloudinary} from 'cloudinary'


const addCar=async (req,res)=>{
try{
    const {model,licencePlate,type,subType,price,description,date}=req.body
    console.log(model)
    const image=req.files.image && req.files.image[0]
    const gltfFile=req.files.gltfFile && req.files.gltfFile[0]
    const files=[image,gltfFile].filter((item)=>item!==undefined)
    console.log('Files received:', req.files);
    const upload = [];
    let uploadedImage = null; // Declare outside the block
    let uploadedGltf = null;  // Declare outside the block

        
    if (image) {
        const result = await cloudinary.uploader.upload(image.path, {
            resource_type: 'image',
            timeout: 120000,
        });
        uploadedImage = result.secure_url;
    }

    // Upload gltfFile
    if (gltfFile) {
        const result = await cloudinary.uploader.upload(gltfFile.path, {
            resource_type: 'raw',
            timeout: 120000,
           
        });
        uploadedGltf = result.secure_url;
    }



    const car1={
        model,
        licencePlate,
        type,
        subType,
        price,
        description,
        date:Date.now(),
        image:uploadedImage,
        gltfFile:uploadedGltf


    }
    const car=new carModel(car1)
    await car.save()
    res.json({sucess:true,message:'car  added successfully'})
 
}
catch(error){
    console.log(error)
    res.json({sucess:false,message:error.message})

}
}
const listCar=async (req,res)=>{
    try{
        const cars=await carModel.find({});
        res.json({sucess:true,cars})

    }
    catch(error){
        console.log(error)
        res.json({sucess:false,message:error.message})
    }

}
const removeCar=async (req,res)=>{

    try{
        const {id}=req.body
        await carModel.findByIdAndDelete(id)
        res.json({sucess:true,message:'product removed sucessfully'})
    }
    catch(error){
        res.json({sucess:false,message:error.message})
    }
}
export {addCar,listCar,removeCar}