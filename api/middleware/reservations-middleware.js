const db = require('./../data/db-config');
const ClientClasses = require('./../models/client_classes-model');

async function checkIfFull(req, res, next){
    const class_id = req.params.class_id;

    const classForBooking = await db('classes').where('class_id', class_id).first()

    if(classForBooking.class_registered_clients >= classForBooking.class_max){
        next({ status: 401, message: 'Sorry, this class is full' })
    } else {
        next();
    }
}

async function checkIfClassExists(req, res, next){
    const class_id = req.params.class_id;
    const validClass = await ClientClasses.getById(class_id);

    if(!validClass){
        next({ status: 404, message: "That class doesn't exist"})
    } else {
        next();
    }

}

module.exports = {
    checkIfFull,
    checkIfClassExists,
}