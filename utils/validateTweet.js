const {body}= require('express-validator')
const validateTweet= ()=>[body("title").not().isEmpty().withMessage("Title should not be empty").isString().withMessage('Title should be a string'),
body("body").not().isEmpty().withMessage("Title should not be empty").isString().withMessage('Title should be a string'),
body("user_id").not().isEmpty().withMessage("Username should not be empty").isLength({min:8}).withMessage("Username should have at least 8 characters")
]

module.exports=validateTweet