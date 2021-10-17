const db = require('./../data/db-config');

async function getAllClasses(){
    return db('classes')
        .select('class_name', 'class_type', 'class_date', 'class_time', 'class_duration', 'class_intensity', 'class_registered_clients', 'class_max')
        .orderBy('class_date', 'asc')
}

function getById(class_id){
    return db('classes')
        .where('class_id', class_id)
        .select('class_name', 'class_type', 'class_date', 'class_time', 'class_duration', 'class_intensity', 'class_registered_clients', 'class_max')
        .orderBy('class_date', 'asc').
        first();
}

function getAllReservedClasses(){}

async function createReservation(user_id, class_id){
    const newReservation = { user_id, class_id }

    const [newReservationObject] = await db('reservations').insert(newReservation, ['reservation_id', 'class_id']);

    let reservedClass = await db('classes').where('class_id', newReservationObject.class_id).first()

    await db('classes')
        .where('class_id', class_id)
        .update('class_registered_clients', reservedClass.class_registered_clients + 1)

    return db('classes')
    .select('class_name', 'class_type', 'class_date', 'class_time', 'class_duration', 'class_registered_clients', 'class_max')
    .where('class_id', newReservationObject.class_id)
    .first()
}

function deleteReservation(){}

module.exports = {
    getAllClasses,
    getById, 
    createReservation,
    deleteReservation,
    getAllReservedClasses
};
