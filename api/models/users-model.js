const db = require("./../data/db-config");

async function addUser({ username, password, role_id }) {
  let newUser = { username, password, role_id };
  const role = await db("roles").where("role_type", role_id).first();
  newUser = { ...newUser, role_id: role.role_id };
  const [newUserObject] = await db("users").insert(newUser, [
    "user_id",
    "username",
    "role_id",
  ]);

  return newUserObject;
}

function findBy(filter) {
  return db("users as u")
    .join("roles as r", "r.role_id", "u.role_id")
    .select("u.user_id", "u.username", "r.role_type", "u.password")
    .where(filter)
    .first();
}

module.exports = {
  addUser,
  findBy,
};
