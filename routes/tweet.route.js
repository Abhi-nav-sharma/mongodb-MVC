const express= require('express')
const { listAllTweets, listTweetsByUser, createTweet, updateTweet, deleteTweet } = require('../controllers/tweet.controller')
const validateTweet = require('../utils/validateTweet')
const router= express.Router()

router.get('/',listAllTweets)

router.get('/user/:user_id',listTweetsByUser)

router.post('/',...validateTweet(),createTweet)

router.patch('/update/:tweet_id',updateTweet)

router.delete('/delete/:tweet_id',deleteTweet)

module.exports= router