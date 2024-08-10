"use client";
import { useMemo, useState } from "react";
import CategoryBreadCrump from "../CategoryBreadCrump";
import BasicInfo from "./BasicInfo";
import CheckActiveAndImage from "./CheckActiveAndImage";
export default function CategoryForm() {
  const [formData, setFormData] = useState({
    name_en: "",
    name_ar: "",
    description_en: "",
    description_ar: "",
    image: "",
    isActive: true,
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("from data submit", formData);
  };
  const abilitySubmit = useMemo(
    () =>
      Object.values(formData)
        .filter((val) => typeof val === "string")
        .some((item) => item?.length),
    [formData]
  );

  return (
    <>
      <CategoryBreadCrump />
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-3 mt-5 gap-5">
          <BasicInfo
            formData={{
              name_en: formData.name_en,
              name_ar: formData.name_ar,
              description_en: formData.description_en,
              description_ar: formData.description_ar,
            }}
            setFormData={setFormData}
          />
          <CheckActiveAndImage
            formData={{
              isActive: formData.isActive,
              image: formData.image,
            }}
            setFormData={setFormData}
          />
        </div>

        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className={`${
              abilitySubmit
                ? "bg-black text-white"
                : "bg-gray-400 pointer-events-none"
            }  rounded-lg py-1 px-2`}
          >
            save
          </button>
        </div>
      </form>
    </>
  );
}
