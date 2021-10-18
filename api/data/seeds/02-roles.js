exports.seed = function (knex, Promise) {
  return knex("roles").insert([
    { role_type: "instructor" },
    { role_type: "client" },
  ]);
};
