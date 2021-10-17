
exports.seed = function(knex, Promise) {
  return knex('users').insert([
    {
      username: 'sailor_cosmos',
      password: '1234',
      instructor_auth: false,
      role_id: 2
    },
    {
      username: 'serena',
      password: '1234',
      instructor_auth: false,
      role_id: 2
    },
    {
      username: 'sailormoon',
      password: '1234',
      instructor_auth: true,
      role_id: 1
    },
    {
      username: 'sailor_pluto',
      password: '1234',
      instructor_auth: true,
      role_id: 1
    },
  ])
};
