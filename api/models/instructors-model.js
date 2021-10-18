const db = require("./../data/db-config");

function getClasses(user_id) {
  return db("classes as c")
    .join("users as u", "c.user_id", "u.user_id")
    .select(
      "u.user_id",
      "c.class_id",
      "c.class_name",
      "c.class_type",
      "c.class_date",
      "c.class_time",
      "c.class_duration",
      "c.class_intensity",
      "c.class_location",
      "c.class_registered_clients",
      "c.class_max"
    )
    .where("u.user_id", user_id)
    .orderBy("c.class_date", "asc");
}

async function getClass(user_id, class_id) {
  const allClasses = await getClasses(user_id);

  const [oneClass] = allClasses.filter((c) => {
    return c.class_id === parseInt(class_id);
  });
  return oneClass;
}

async function addClass(newClass) {
  const [newClassObject] = await db("classes").insert(newClass, [
    "user_id",
    "class_id",
    "class_name",
    "class_type",
    "class_date",
    "class_time",
    "class_duration",
    "class_intensity",
    "class_location",
    "class_registered_clients",
    "class_max",
  ]);
  return newClassObject;
}

async function updateClass(class_id, update) {
  await db("classes").update(update).where("class_id", class_id);
  return getClass(update.user_id, class_id);
}

async function deleteClass(user_id, class_id) {
  return db("classes").where("class_id", class_id).del();
}

module.exports = {
  getClasses,
  getClass,
  addClass,
  updateClass,
  deleteClass,
};
