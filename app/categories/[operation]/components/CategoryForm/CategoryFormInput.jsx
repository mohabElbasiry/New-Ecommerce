import { InputWithLabelComponent } from "@/components/inputcomponent";
import { memo } from "react";

export default memo(function CategoryFormInput({
  handleChange,
  formData,
  formErrors,
  lang,
}) {
  return (
    <InputWithLabelComponent
      Input
      label={lang === "en" ? "english name" : "arabic name"}
      PlaceHolder={lang === "en" ? "english name" : "arabic name"}
      name={`name_${lang}`}
      value={formData[`name_${lang}`]}
      onChange={(event) => handleChange(event)}
      isError={formErrors?.[`name_${lang}`]}
      message={formErrors?.[`name_${lang}`]}
    />
  );
});
