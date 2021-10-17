const express = require('express');
const router = express.Router();
const { restricted, only } = require('./../middleware/auth-middleware');
const Instructors = require('./../models/instructors-model');

//[GET] /:user_id/classes
router.get('/:user_id/classes',restricted, only('instructor'), (req, res, next) => {
    Instructors.getClasses(req.params.user_id)
        .then(classes => {
            res.status(200).json(classes)
        })
        .catch(next)
})

//[GET] /:user_id/classes/:class_id
router.get('/:user_id/classes/:class_id', restricted, only('instructor'), (req, res, next) => {})

//[POST] /classes/ (auth instructor)
router.post('/classes', restricted, only('instructor'), (req, res, next) => {})

//[PUT] /:user_id/classes/:class_id(auth_instructor)
router.put('/:user_id/classes/:class_id', restricted, only('instructor'), (req, res, next) => {})

//[DELETE] /:user_id/classes/:class_id (auth instructor)
router.delete('/:user_id/classes/:class_id', restricted, only('instructor'), (req, res, next) => {})

module.exports = router;
