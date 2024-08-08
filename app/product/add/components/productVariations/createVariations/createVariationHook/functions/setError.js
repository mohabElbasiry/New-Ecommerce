import { produce } from "immer";

export const handleError = (
  value,
  index,
  isAr,
  setError,
  currentValues,
  error
) => {
  console.log('object');
  if (index === 0 || value === "" || !currentValues?.length) {
    return;
  }

  setError(
    produce((draft) => {
      const existingError = draft?.error?.find((item) => item?.index === index);
      const newObj = {
        index,
        ar: { index: -1, Message: "", isAr: false },
        en: { index: -1, Message: "", isAr: false },
      };

      const fieldType = isAr ? "ar" : "en";
      const valueKey = isAr ? "value_ar" : "value_en";
      const errorKey = isAr ? "ar" : "en";

      const valueExists = currentValues.some(
        (item) => item?.[valueKey]?.trim() === value.trim()
      );

      if (existingError) {
        existingError[errorKey] = valueExists
          ? {
              index,
              Message: "This Value Already Exist",
              isAr: isAr && valueExists,
            }
          : {
              index: -1,
              Message: "",
              isAr: isAr && valueExists,
            };
      } else {
        newObj[errorKey] = valueExists
          ? {
              index,
              Message: "This Value Already Exist",
              isAr: isAr && valueExists,
            }
          : {
              index: -1,
              Message: "",
              isAr: isAr && valueExists,
            };
        draft.error.push(newObj);
      }
    })
  );
};
