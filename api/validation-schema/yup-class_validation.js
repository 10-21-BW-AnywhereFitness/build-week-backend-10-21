const yup = require("yup");

const validateClassSchema = yup.object().shape({
  class_name: yup
    .string()
    .trim()
    .required("name of class is required")
    .min(3, "class name must be between 3-100 chars")
    .max(100, "class name must be between 3-100 chars"),
  class_type: yup
    .string()
    .trim()
    .required("class type is required")
    .min(3, "class type must be between 3-12 chars")
    .max(12, "class type must be between 3-12 chars"),
  class_date: yup.date().required("a date is required"),
  class_duration: yup.number().required("duration is required"),
  class_intensity: yup.string().trim().required("intensity is required"),
  class_location: yup.string().trim().required("location is required"),
  class_registered_clients: yup.number().default(0),
  class_max: yup.number().default(5),
});

module.exports = {
  validateClassSchema,
};
