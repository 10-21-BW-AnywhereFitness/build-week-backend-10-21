const express = require("express");
const router = express.Router();
const {
  checkUsernameExists,
  validateUsername,
  validatePassword,
  validateRoleType,
  checkPasswordCorrect,
  hashThePassword,
} = require("./../middleware/auth-middleware");
const Users = require("./../models/users-model");

//[POST]  /api/auth/register
router.post(
  "/register",
  validateUsername,
  validatePassword,
  validateRoleType,
  hashThePassword,
  (req, res, next) => {
    Users.addUser(req.body)
      .then((newUser) => {
        res.status(201).json(newUser);
      })
      .catch(next);
  }
);

//[POST]  /api/auth/login
router.post(
  "/login",
  checkUsernameExists,
  checkPasswordCorrect,
  (req, res, next) => {
    try {
      res.status(200).json({
        user_id: req.user_id,
        role_id: req.role_id,
        message: `Welcome back ${req.body.username}`,
        token: req.token,
      });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
