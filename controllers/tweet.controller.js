const { validationResult } = require("express-validator")
const Tweet = require("../models/tweets.model")

const listAllTweets= async (req,res)=>{
    try{
        const per_page= req.query.per_page || 2
        const page= req.query.page || 1
        const skip= page<0?0:(page-1)*per_page
        const tweets= await Tweet.find().skip(skip).limit(per_page)
        const count= await Tweet.find().count()
        if(!tweets){
            return res.status(400).send('Oops! Something went wrong.')
        }
        res.status(200).json({tweets,count})
    }
    catch(err){
        return res.status(400).json({status:'failure',error:err.toString()})
    }
}

const listTweetsByUser= async(req,res)=>{
    try{
        const per_page= req.query.per_page || 2
        const page= req.query.page || 1
        const skip= page<0?0:(page-1)*per_page
        const tweets= await Tweet.find({user_id:req.params.user_id}).skip(skip).limit(per_page)
        const count= await Tweet.find({user_id:req.params.user_id}).count()
        if(!tweets){
            return res.status(400).send('No tweets found for this user')
        }
        res.status(200).json({tweets,count})
    }
    catch{
        return res.status(400).json({status:'failure',error:err.toString()})
    }
}

const createTweet = async(req,res)=>{
    try{
        const errors= validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }
        const tweet= await Tweet.create({
            title:req.body.title,
            body:req.body.body,
            tags:req.body.tags,
            user_id:req.body.user_id
        })
        if(!tweet){
            return res.status(400).json({msg:'Oops! Tweet not created'})
        }
        return res.status(200).json(tweet)
    }
    catch(err){
        return res.status(400).json({status:'failure',error:err.toString()})
    }
}

const deleteTweet = async(req,res)=>{
    try{
        const tweet= await Tweet.findOneAndDelete({_id:req.params.tweet_id})
        if(!tweet){
            return res.status(400).json({msg:'Tweet not found'})
        }
        return res.status(200).json({deleted:tweet})
    }
    catch(err){
        return res.status(400).json({status:'failure',error:err.toString()})
    }
}

const updateTweet = async(req,res)=>{
    try{
        const tweet= await Tweet.findOneAndUpdate({
            _id:req.params.tweet_id
        },{
            $set:{
                title:req.body.title,
                body:req.body.body
            }
        },{
            returnOriginal:false
        })
        if(!tweet){
            return res.status(400).json({msg:'Tweet not found'})
        }
        return res.status(200).json(tweet)
    }
    catch(err){
        return res.status(400).json({status:'failure',error:err.toString()})
    }
}

module.exports={
    listAllTweets,
    listTweetsByUser,
    createTweet,
    deleteTweet,
    updateTweet
}