const express = require('express');
const router = express.Router();
const { restricted, only } = require('./../middleware/auth-middleware');
const { checkIfFull } = require('./../middleware/reservations-middleware')
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
router.get('/classes/:class_id', (req, res, next) => {
    ClientClasses.getById(req.params.class_id)
        .then(classById => {
            res.status(200).json(classById);
        })
        .catch(next)
})

//[POST] /client/classes/:class_id
router.post('/classes/:class_id', restricted, checkIfFull, (req, res, next) => {

    const user_id = req.decodedToken.subject;
    const class_id = req.params.class_id;
    ClientClasses.createReservation(user_id, class_id)
        .then(res => {
            console.log('resp', res)
        })
        .catch(next)
})

//[DELETE] /client/classes/:class_id
router.delete('/classes', restricted, (req, res, next) => {})

//[GET] /client/classes/:user_id
router.get('/classes/:user_id', restricted, (req, res, next) => {})

module.exports = router;
