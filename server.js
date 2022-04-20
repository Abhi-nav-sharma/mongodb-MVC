const express= require('express')
const connect  = require('./config/db')
const Tweet = require('./models/tweets.model')
const tweetsRouter= require('./routes/tweet.route')
const usersRouter= require('./routes/user.route')

const app = express()
app.set("view engine",'ejs')
app.use(express.static('public'))
app.use(express.json())
app.use('/tweets',tweetsRouter)
app.use('/users',usersRouter)
app.get('/',async(req,res)=>{
    try{
        const tweets= await Tweet.find()
        if(!tweets){
            return res.status(400).send('Oops! Something went wrong.')
        }
        res.render('tweets',{tweets:tweets})
    }
    catch(err){
        return res.status(400).json({status:'failure',error:err.toString()})
    }
})
const start= async ()=>{
    await connect()
    console.log('Connected to mongodb')
    app.listen(1234,(req,res)=>{
        console.log('Listening on port 1234')
    })
}

module.exports=start