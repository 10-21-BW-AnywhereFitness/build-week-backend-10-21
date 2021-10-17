const express = require('express');
const router = express.Router();
const { restricted, only } = require('./../middleware/auth-middleware');
const { checkIfFull, checkIfClassExists, onlyOnce } = require('./../middleware/reservations-middleware')
const ClientClasses = require('./../models/client_classes-model');

//[GET] /client/classes (auth client)
router.get('/classes', restricted, (req, res, next) => {
    ClientClasses.getAllClasses()
        .then(classes => {
            res.status(200).json(classes)
        })
        .catch(next)
})

//[GET]/client/classes/:type || class_time || duration || intensity_level || class_location

//[GET] /client/classes/:class_id
router.get('/classes/:class_id', checkIfClassExists, (req, res, next) => {
    ClientClasses.getById(req.params.class_id)
        .then(classById => {
            res.status(200).json(classById);
        })
        .catch(next)
})

//[POST] /client/classes/:class_id
router.post('/classes/:class_id', restricted,checkIfClassExists, checkIfFull, onlyOnce, (req, res, next) => {
    const user_id = req.decodedToken.subject;
    const class_id = req.params.class_id;
    ClientClasses.createReservation(user_id, class_id)
        .then(reservation => {
            res.status(201).json(reservation)
        })
        .catch(next)
})

//[DELETE] /client/classes/:class_id
router.delete('/classes/:class_id', restricted, checkIfClassExists, (req, res, next) => {

})

//[GET] /client/:user_id/classes
router.get('/:user_id/classes', restricted, (req, res, next) => {
    ClientClasses.getAllReservedClasses(req.params.user_id)
        .then(allClasses => {
            res.status(200).json(allClasses)
        })
        .catch(next)
})

module.exports = router;
