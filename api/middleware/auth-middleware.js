const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { JWT_SECRET } = require("./../secrets/index");
const { tokenBuilder } = require("./../auth/tokenBuilder");
const Users = require("./../models/users-model");

//access middleware
const restricted = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return next({ status: 401, message: "Token required" });
  }

  jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return next({ status: 401, message: "Token invalid" });
    }

    req.decodedToken = decodedToken;
    return next();
  });
};

const only = (role_type) => (req, res, next) => {
    if(req.decodedToken.role_type === role_type){
        next();
    } else {
        next({ status: 403, message: 'You do not have the correct permissions for that'})
    }
};

//validation middleware
const checkUsernameExists = async (req, res, next) => {
  const validUsername = await Users.findBy({ username: req.body.username });
  if (!validUsername) {
    next({ status: 404, message: "That username doesn't exist" });
  } else {
    next();
  }
};

const validateUsername = async (req, res, next) => {
  const { username } = req.body;
  const userNameTaken = username
    ? await Users.findBy({ username: req.body.username })
    : null;

  if (!username || username.trim().length < 1) {
    next({ status: 401, message: "Username required" });
  } else if (userNameTaken) {
    next({ status: 401, message: "That username is already taken" });
  } else {
    next();
  }
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;

  if (!password || password.trim().length < 1) {
    next({ status: 401, message: "Password required" });
  } else if (password.length < 5) {
    next({ status: 401, message: "Password must be at least 5 chars" });
  } else {
    next();
  }
};

const validateRoleType = (req, res, next) => {
  const role = req.body.role_id;
  if (!role || role.trim().length < 1) {
    req.body.role_id = "client";
    next();
  } else {
    next();
  }
};

const checkPasswordCorrect = async (req, res, next) => {
  let { username, password } = req.body;

  const validUser = await Users.findBy({ username: username });

  if (validUser && bcrypt.compareSync(password, validUser.password)) {
    const token = tokenBuilder(validUser);
    req.token = token;
    next();
  } else {
    next({ status: 401, message: "Invalid credentials" });
  }
};

const hashThePassword = (req, res, next) => {
  const rounds = process.env.BCRYPT_ROUNDS || 8;
  const hash = bcrypt.hashSync(req.body.password, rounds);

  req.body.password = hash;
  next();
};

module.exports = {
  restricted,
  only,
  checkUsernameExists,
  validateUsername,
  validatePassword,
  validateRoleType,
  checkPasswordCorrect,
  hashThePassword,
};
