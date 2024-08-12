"use client";
import { useMemo, useState } from "react";
import CategoryBreadCrump from "../CategoryBreadCrump";
import BasicInfo from "./BasicInfo";
import CheckActiveAndImage from "./CheckActiveAndImage";
import { handleCreateCategory } from "@/app/categories/utils/functions";
import { toastMessagener } from "@/components/Layout/RootSignal";
import { useRouter } from "next/navigation";
export default function CategoryForm({ parentId }) {
  const [formData, setFormData] = useState({
    name_en: "",
    name_ar: "",
    description_en: "",
    description_ar: "",
    image: "test.png",
    isActive: true,
  });
  const resetForm = () => {
    setFormData((prev) => {
      const prevKeys = Object.keys(prev);
      const result = prevKeys.reduce(
        (acc, key) => ({ ...acc, [key]: key === "isActive" ? true : "" }),
        {}
      );
      return result;
    });
  };
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    let payload = { ...formData };
    payload["name"] = { en: formData.name_en, ar: formData.name_ar };
    payload["description"] = {
      en: formData.description_en,
      ar: formData.description_ar,
    };
    if (parentId) {
      payload.parentId = parentId;
    }
    ["name_en", "name_ar", "description_en", "description_ar"].forEach(
      (delKey) => delete payload[delKey]
    );
    await handleCreateCategory(payload).then((res) => {
      setLoading(false);
      if (res.status === "success") {
        toastMessagener.success(res.messages[0].message_en);
        router.push(`/categories`);
        reseting();
      } else {
        toastMessagener.error(
          res.messages.at(res.messages.length - 1).message_en
        );
      }
    });
    resetForm();
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
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </>
  );
}
