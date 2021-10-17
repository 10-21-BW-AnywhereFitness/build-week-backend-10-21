
exports.seed = function(knex, Promise) {
  return knex('classes').insert([
    {
      class_name: "Bangin' Bhangra",
      class_type: 'Dance',
      class_date: '2021-10-31',
      class_time: '12:00:00',
      class_duration: 30,
      class_intensity: 'high',
      class_location: 'Oakland',
      class_registered_clients: 0,
      class_max: 10,
      user_id: 3
    },
    {
      class_name: "Relaxing Yoga",
      class_type: 'Yoga',
      class_date: '2021-10-21',
      class_time: '18:00:00',
      class_duration: 60,
      class_intensity: 'low',
      class_location: 'Berkeley',
      class_registered_clients: 3,
      class_max: 20,
      user_id: 4
    },
    {
      class_name: "Ride through the Alps",
      class_type: 'Spin',
      class_date: "2021-10-15",
      class_time: '9:00:00',
      class_duration: 60,
      class_intensity: 'medium',
      class_location: 'San Francisco',
      class_registered_clients: 2,
      class_max: 35,
      user_id: 4
    },
  ])
};
