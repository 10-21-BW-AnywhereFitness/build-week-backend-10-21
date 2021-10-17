const bcrypt = require('bcryptjs');
const { JWT_SECRET } = require('./../secrets/index');
const { tokenBuilder } = require('./../auth/tokenBuilder');
// const Users = require('')

//access middleware
const restricted = (req, res, next) => {}

const only = (role_name) => (req, res, next) => {}

//validation middleware
const checkUsernameExists = (req, res, next) => {}

const validateUsername = (req, res, next) => {}

const validatePassword = (req, res, next) => {}

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
