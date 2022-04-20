const mongoose= require('mongoose')

TweetSchema= new mongoose.Schema({
    title:{type:String,required:true},
    body:{type:String,required:true},
    tags:{type:Array},
    user_id:{type:String,required:true}
})

const Tweet= mongoose.model('tweets',TweetSchema)
module.exports=Tweet 