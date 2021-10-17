const express = require('express');
const bcrypt = require('bcryptjs');
const { JWT_SECRET } = require('./../secrets/index');
const { tokenBuilder } = require('./tokenBuilder');
const Users = require('')

//access middleware
const restricted = (req, res, next) => {}

const only = (role_name) => (req, res, next) => {}

//validation middleware
const checkUsernameExists = (req, res, next) => {}

const validateUsername = (req, res, next) => {}

const checkPasswordCorrect = (req, res, next) => {}

const hashThePassword = (req, res, next) => {}

module.exports = {
    restricted,
    only,
    checkUsernameExists,
    validateUsername,
    checkPasswordCorrect,
    hashThePassword
}
