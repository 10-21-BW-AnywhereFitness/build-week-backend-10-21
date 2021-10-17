const express = require('express');
const router = express.Router();
const { hashThePassword } = require('./../middleware/auth-middleware');
const Users = require('./../models/users-model'); 

//[POST]  /register
router.post('/register', (req, res, next) => {
    Users.addUser(req.body)
        .then(newUser => {
            res.status(201).json(newUser);
        })
        .catch(next)
})

//[POST]  /login
router.post('/login', (req, res, next) => {
    try {
        res.status(200).json({
            message: `Welcome back ${req.body.username}`,
            // token: req.token,
        })
    }
    catch(err){
        next(err);
    }
})
 
module.exports = router;
