
exports.seed = function(knex) {
    return knex('reservations').insert([
        {
            user_id: 1,
            class_id: 1,
        },
        {
            user_id: 2,
            class_id: 2,
        },
        {
            user_id: 2,
            class_id: 3,
        },
        {
            user_id: 1,
            class_id: 3,
        },

    ])
};
