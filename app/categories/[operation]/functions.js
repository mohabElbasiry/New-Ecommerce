export const validationData = (formData) => {
  let errors = {};

  if (!formData?.name_ar) {
    errors.name_en = "required";
  }
  if (!formData?.name_ar) {
    errors.name_ar = "required";
  }
  return errors;
};
