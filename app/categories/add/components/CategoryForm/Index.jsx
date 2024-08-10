"use client";
import { useState } from "react";
import CategoryBreadCrump from "../CategoryBreadCrump";
import BasicInfo from "./BasicInfo";
export default function CategoryForm() {
  const [formData, setFormData] = useState({
    name_en: "",
    name_ar: "",
    description_en: "",
    description_ar: "",
    image: "",
    isActive: null,
  });

  const [errors, setErrors] = useState({});
  console.log("data once chaned:: ", formData);
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("from data submit", formData);
  };
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
          {/* <CheckActiveAndImage /> */}
        </div>

        <div className="flex justify-end mt-4">
          <button type="submit" className="bg-gray-400 rounded-lg py-1 px-2">
            save
          </button>
        </div>
      </form>
    </>
  );
}
