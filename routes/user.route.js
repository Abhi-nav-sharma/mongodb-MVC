const express= require('express')
const { createTweet } = require('../controllers/tweet.controller')
const { getUsers, deleteUSer, updateUser, createUser, updateAvatar } = require('../controllers/user.controller')
const User = require('../models/user.model')
const upload = require('../utils/fileUpload')
const validateUser = require('../utils/validateUser')
const router= express.Router()

router.get('/',getUsers)

router.get("/:user_id",async (req,res)=>{
    try{
        const per_page=req.query.per_page || 2
    const page = req.query.page || 1
    const skip= page<0 ? 0 : (page-1)*per_page
    const user= await User.findOne({_id:req.params.user_id}).skip(skip).limit(per_page)
    if(!user){
        return res.status(404).send('No users found')
    }
    console.log(user)
    // res.status(200).json(users)
    return res.render('single_user',{user:user})

    }    
    catch(err){
        return res.status(400).json({msg:'Something went wrong'})
    }
})

router.post('/',...validateUser(),createUser)

router.delete('/delete/:user_id',deleteUSer)

router.patch("/update/:user_id",updateUser)

router.patch('/avatar/:user_id',upload.single("avatar"),updateAvatar)

module.exports= router