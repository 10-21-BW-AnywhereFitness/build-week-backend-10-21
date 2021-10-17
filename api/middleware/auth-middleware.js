const bcrypt = require('bcryptjs');
const { JWT_SECRET } = require('./../secrets/index');
const { tokenBuilder } = require('./../auth/tokenBuilder');
const Users = require('./../models/users-model');

//access middleware
const restricted = (req, res, next) => {}

const only = (role_name) => (req, res, next) => {}

//validation middleware
const checkUsernameExists = async (req, res, next) => {
    const validUsername = await Users.findBy({ username: req.body.username });
    if(!validUsername){
        next({ status: 404, message: "That username doesn't exist" })
    } else {
        next();
    }
}

const validateUsername = async (req, res, next) => {
    const { username } = req.body;
    const userNameTaken  = username ? await Users.findBy({ username: req.body.username }) : null;

    if(!username || username.trim().length < 1 ) {
        next({ status: 401, message: 'Username required'})
    } else if(userNameTaken){
        next({ status: 401, message: 'That username is already taken'})
    } else {
        next();
    }
}

const validatePassword = (req, res, next) => {
    const { password } = req.body;

    if(!password || password.trim().length < 1){
        next({ status: 401, message: 'Password required'});
    } else if(password.length < 5){
        next({ status: 401, message: 'Password must be at least 5 chars' })
    } else {
        next();
    }
}

const checkPasswordCorrect = (req, res, next) => {}

const hashThePassword = (req, res, next) => {
    const rounds = process.env.BCRYPT_ROUNDS || 8;
    const hash = bcrypt.hashSync(req.body.password, rounds);

    req.body.password = hash;
    next();
}

module.exports = {
    restricted,
    only,
    checkUsernameExists,
    validateUsername,
    validatePassword,
    checkPasswordCorrect,
    hashThePassword
}
