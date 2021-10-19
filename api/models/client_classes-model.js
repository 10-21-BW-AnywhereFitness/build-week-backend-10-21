const db = require("./../data/db-config");

async function getAllClassesPublic() {
  return db("classes")
    .select(
      "class_name",
      "class_date",
      "class_time",
      "class_description",
    )
    .orderBy("class_date", "asc");
}

async function getAllClassesAuth() {
  return db("classes")
    .select(
      "class_name",
      "class_type",
      "class_date",
      "class_time",
      "class_duration",
      "class_description",
      "class_intensity",
      "class_registered_clients",
      "class_max"
    )
    .orderBy("class_date", "asc");
}

function getById(class_id) {
  return db("classes")
    .where("class_id", class_id)
    .select(
      "class_name",
      "class_type",
      "class_date",
      "class_time",
      "class_duration",
      "class_intensity",
      "class_registered_clients",
      "class_max"
    )
    .orderBy("class_date", "asc")
    .first();
}

function getAllReservedClasses(user_id) {
  return db("reservations as r")
    .join("classes as c", "r.class_id", "c.class_id")
    .select(
      "r.class_id",
      "r.reservation_id",
      "c.class_name",
      "c.class_type",
      "c.class_date",
      "c.class_time",
      "c.class_registered_clients"
    )
    .where("r.user_id", user_id);
}

async function getReservedClass(user_id, class_id) {
  const allClasses = await getAllReservedClasses(user_id);
  const oneClass = allClasses.filter((c) => {
    return c.class_id === parseInt(class_id);
  });
  return oneClass[0];
}

async function createReservation(user_id, class_id) {
  const newReservation = { user_id, class_id };

  const [newReservationObject] = await db("reservations").insert(
    newReservation,
    ["reservation_id", "class_id"]
  );

  let reservedClass = await db("classes")
    .where("class_id", newReservationObject.class_id)
    .first();

  await db("classes")
    .where("class_id", class_id)
    .update(
      "class_registered_clients",
      reservedClass.class_registered_clients + 1
    );

  return db("classes")
    .select(
      "class_name",
      "class_type",
      "class_date",
      "class_time",
      "class_duration",
      "class_registered_clients",
      "class_max"
    )
    .where("class_id", newReservationObject.class_id)
    .first();
}

async function deleteReservation(user_id, class_id) {
  const classToDelete = await getReservedClass(user_id, class_id);
  await db("classes")
    .where("class_id", class_id)
    .update(
      "class_registered_clients",
      classToDelete.class_registered_clients - 1
    );
  return db("reservations")
    .where("reservation_id", classToDelete.reservation_id)
    .del();
}

module.exports = {
  getAllClassesPublic,
  getAllClassesAuth,
  getById,
  getAllReservedClasses,
  getReservedClass,
  createReservation,
  deleteReservation,
};
