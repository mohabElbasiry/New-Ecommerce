import { LanguageSelect } from "@/components/GlobalUi/languageSelect";
import { produce } from "immer";
import React, { memo } from "react";
import CategoryFormInput from "./CategoryFormInput";
import CategoryFormTextEditor from "./CategoryFormTextEditor";

function BasicInfo({ formData, setFormData, formErrors, setFormErrors }) {
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(
      produce((draft) => {
        draft[name] = value;
      })
    );
    if (value === "") {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "Required*",
      }));
    }
    if (value && formErrors?.hasOwnProperty(name)) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };
  return (
    <div className=" bg-white p-8 col-span-2 rounded-2xl">
      <LanguageSelect>
        <CategoryFormInput
          formData={formData}
          formErrors={formErrors}
          handleChange={handleChange}
        />
        <CategoryFormTextEditor formData={formData} setFormData={setFormData} />
      </LanguageSelect>
    </div>
  );
}
export default memo(BasicInfo);
