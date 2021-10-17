const express = require('express');
const router = express.Router();
const { restricted, only } = require('./../middleware/auth-middleware');
const { checkClassId, checkClassExists, validateClass } = require('./../middleware/instructors-middleware'); 
const Instructors = require('./../models/instructors-model');

//[GET] /api/instructor/:user_id/classes
router.get('/:user_id/classes',restricted, only('instructor'), (req, res, next) => {
    Instructors.getClasses(req.params.user_id)
        .then(classes => {
            res.status(200).json(classes)
        })
        .catch(next)
})

//[GET] /api/instructor/:user_id/classes/
router.get('/:user_id/classes/:class_id', restricted, only('instructor'), checkClassExists, checkClassId, (req, res, next) => {
    Instructors.getClass(req.params.user_id, req.params.class_id)
        .then(oneClass => {
            res.status(200).json(oneClass)
        })
        .catch(next)
})

//[POST] /api/instructor/:user_id/classes/ (auth instructor)
router.post('/:user_id/classes', restricted, only('instructor'), validateClass, (req, res, next) => {
    Instructors.addClass(req.body)
        .then(newClass => {
            res.status(201).json(newClass)
        })
        .catch(next)
})

//[PUT] /api/instructor/:user_id/classes/:class_id (auth_instructor)
router.put('/:user_id/classes/:class_id', restricted, only('instructor'), checkClassExists, checkClassId, validateClass, (req, res, next) => {
    Instructors.updateClass(req.params.class_id, req.body)
        .then(updatedClass => {
            res.status(200).json(updatedClass)
        })
        .catch(next)
})

//[DELETE] /api/instructor/:user_id/classes/:class_id (auth instructor)
router.delete('/:user_id/classes/:class_id', restricted, only('instructor'), checkClassExists, checkClassId, (req, res, next) => {
    Instructors.deleteClass(req.params.user_id, req.params.class_id)
        .then(() => {
            res.status(200).json({ message: 'Class successfully deleted!'})
        })
        .catch(next)
})

module.exports = router;
