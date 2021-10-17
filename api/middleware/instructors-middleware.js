const db = require("./../data/db-config");
const {
  validateClassSchema,
} = require("./../validation-schema/yup-class_validation");
const Instructors = require("./../models/instructors-model");

async function checkClassExists(req, res, next) {
  const exists = await db("classes")
    .where("class_id", req.params.class_id)
    .first();
  if (!exists) {
    next({ status: 404, message: "This class doesn't exist" });
  } else {
    next();
  }
}

async function checkClassId(req, res, next) {
  const classToMatch = await db("classes")
    .where("class_id", req.params.class_id)
    .first();
  if (classToMatch.user_id !== parseInt(req.params.user_id)) {
    next({ status: 404, message: "No class found" });
  } else {
    next();
  }
}

async function validateClass(req, res, next) {
  try {
    const validatedClass = await validateClassSchema.validate(req.body);
    const validatedClassWithUserId = {
      ...validatedClass,
      user_id: req.params.user_id,
    };

    req.body = validatedClassWithUserId;
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  checkClassExists,
  checkClassId,
  validateClass,
};
