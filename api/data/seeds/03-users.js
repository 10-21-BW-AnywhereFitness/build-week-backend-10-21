
exports.seed = function(knex, Promise) {
  return knex('users').insert([
    {
      username: 'princess_serenity',
      password: '$2a$08$9pPEnyGN8fzDI0hXwvf0keXZO.cPzE2VoqsHzr42z/MSbGk7vMToq',
      // instructor_auth: false,
      role_id: 2
    },
    {
      username: 'bubbles',
      password: '$2a$08$kT.DVLzauKk0DGEBOxAToOQy8.KbP8rGC5sOM0duMXa5C8O493IdG',
      // instructor_auth: false,
      role_id: 2
    },
    {
      username: 'sailor_moon',
      password: '$2a$08$qgYBpNT8Sz3NWOOgIfXmrus/W3Qw4YNU90YPfabqRR5RiQBA6rxKi',
      // instructor_auth: true,
      role_id: 1
    },
    {
      username: 'selene',
      password: '$2a$08$UM8FaHkRH4iADtlWvBqr7.WK7VRtbbtT9jViSji.IuXYObCkuX20e',
      // instructor_auth: true,
      role_id: 1
    },
  ])
};
