const db = require('./../data/db-config');
const Instructors = require('./../models/instructors-model');

async function checkClassExists(req, res, next){
    const exists = await db('classes').where('class_id', req.params.class_id).first()
    if(!exists){
        next({ status: 404, message: "This class doesn't exist"})
    } else {
        next();
    }
}

async function checkClassId(req, res, next){
    const classToMatch = await db('classes').where('class_id', req.params.class_id).first();
    if(classToMatch.user_id !== parseInt(req.params.user_id)){
        next({ status: 404, message: 'No class found'})
    } else {
        next();
    }
}

function validateClass(req, res, next){}


module.exports = {
    checkClassExists,
    checkClassId,
    validateClass,
}