const {body}= require('express-validator')
const validateUser= ()=>[body("username").not().isEmpty().withMessage("Username should not be empty").isLength({min:8}).withMessage("Username should have at least 8 characters"),
body("email_id").not().isEmpty().withMessage("Email id should not be empty").isString().withMessage('Email id should be a string')
]

module.exports=validateUser