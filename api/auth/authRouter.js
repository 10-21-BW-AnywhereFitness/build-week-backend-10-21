const express = require('express');
const router = express.Router();
const { checkUsernameExists, validateUsername, validatePassword, validateRoleType, checkPasswordCorrect, hashThePassword } = require('./../middleware/auth-middleware');
const Users = require('./../models/users-model'); 

//[POST]  /register
router.post('/register', validateUsername, validatePassword, validateRoleType, hashThePassword, (req, res, next) => {
    Users.addUser(req.body)
        .then(newUser => {
            res.status(201).json(newUser);
        })
        .catch(next)
})

//[POST]  /login
router.post('/login', checkUsernameExists, checkPasswordCorrect, (req, res, next) => {
    try {
        res.status(200).json({
            message: `Welcome back ${req.body.username}`,
            token: req.token,
        })
    }
    catch(err){
        next(err);
    }
})
 
module.exports = router;
