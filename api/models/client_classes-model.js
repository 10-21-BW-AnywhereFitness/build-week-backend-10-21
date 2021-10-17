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

function getAllReservedClasses(user_id){
    return db('reservations as r')
        .join('classes as c', 'r.class_id', 'c.class_id')
        .select('c.class_name', 'c.class_type', 'c.class_date', 'c.class_time')
        .where('r.user_id', user_id)
}

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

function deleteReservation(user_id, class_id){

}

module.exports = {
    getAllClasses,
    getById, 
    createReservation,
    deleteReservation,
    getAllReservedClasses
};
