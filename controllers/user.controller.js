const express= require('express')
const router= express.Router()
const User= require('../models/user.model')
const {validationResult}= require('express-validator')
const upload = require('../utils/fileUpload')

//pagination
//?limit,skip

const getUsers= async (req,res)=>{
    const per_page=req.query.per_page || 2
    const page = req.query.page || 1
    const skip= page<0 ? 0 : (page-1)*per_page
    const users= await User.find()
    console.log(users)
    res.render('users',{users:users})
}


const createUser= async (req,res)=>{
    try{
        //Validate
        const errors= validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }
        // if(!req.body.name){
        //     return res.status(404).json({msg:'Name is required'})
        // }
        const user= await User.create({
            username:req.body.username,
            email_id:req.body.email_id
        })
        if(!user){
            return res.status(400).json({msg:'User not created'})
        }
        return res.status(200).json(user)
    }
    catch(err){
        return res.status(400).json({msg:'Something went wrong'})
    }
}

const deleteUSer= async (req,res)=>{
    try{
        const user= await User.findOneAndDelete({_id:req.params.user_id})
        if(!user){
            return res.status(400).json({msg:'User not found'})
        }
        return res.status(200).json(user)
    }
    catch(err){
        return res.status(400).json({msg:'Something went wrong'}) 
    }
}

const updateUser= async(req,res)=>{
    try{
        const user= await User.findOneAndUpdate({
            _id:req.params.user_id
        },{
            $set:{
                username:req.body.username,
                email_id:req.body.email_id
            }
        },{
            returnOriginal:false
        })
        if(!user){
            return res.status(400).json({msg:'User not found'})
        }
        return res.status(200).json(user)
    }
    catch(err){
        return res.status(400).json({msg:'Something went wrong'}) 
    }
}
const updateAvatar= async(req,res)=>{
    try{
        const user= await User.findOneAndUpdate({
            _id:req.params.user_id
        },{
            $set:{
                avatar: req.file.path
            }
        },{
            returnOriginal:false
        })
        if(!user){
            return res.status(400).json({msg:'User not found'})
        }
        return res.status(200).json(user)
    }
    catch(err){
        return res.status(400).json({msg:'Something went wrong'}) 
    }
}
module.exports= {
    getUsers,
    deleteUSer,
    updateUser,
    createUser,
    updateAvatar
}