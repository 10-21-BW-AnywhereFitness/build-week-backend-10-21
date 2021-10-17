const db = require('./../data/db-config');

async function getAllClasses(){
    return db('classes')
        .select('class_name', 'class_type', 'class_date', 'class_time', 'class_duration', 'class_intensity', 'class_registered_clients', 'class_max')
        .orderBy('class_date', 'asc')
}

function getAllReservedClasses(){}

function createReservation(){}

function deleteReservation(){}

module.exports = {
    getAllClasses,
    createReservation,
    deleteReservation,
    getAllReservedClasses
};
