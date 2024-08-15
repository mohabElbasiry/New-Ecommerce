"use client";
import { useEffect, useMemo, useState } from "react";
import CategoryBreadCrump from "../CategoryBreadCrump";
import BasicInfo from "./BasicInfo";
import CheckActiveAndImage from "./CheckActiveAndImage";
import { handleCategoryOperations } from "@/app/categories/utils/functions";
import { toastMessagener } from "@/components/Layout/RootSignal";
import { useRouter } from "next/navigation";
import { validationData } from "../../functions";
import { getOperationClient } from "@/lib/apiUtilsClient";
export default function CategoryForm({ parentId, editId, params }) {
  console.log("Params in categoryForm", params);
  console.log("Params in parentId", parentId);
  const [urlsFiles, setUrlsFiles] = useState([]);
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

  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState();
  console.log("formErrors", formErrors);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const errors = validationData(formData);
    if (Object.keys(errors).length) {
      setLoading(false);
      return setFormErrors(errors);
    }
    let payload = { ...formData };
    payload["name"] = { en: formData.name_en, ar: formData.name_ar };
    payload["description"] = {
      en: formData.description_en,
      ar: formData.description_ar,
    };
    if (parentId) {
      payload.parentId = parentId;
    }
    if (urlsFiles?.length) {
      payload.image = urlsFiles?.[0]?.filename || "test-add.png";
    } else {
      payload.image = "test.png";
    }
    ["name_en", "name_ar", "description_en", "description_ar"].forEach(
      (delKey) => delete payload[delKey]
    );
    const editedById = editId && params.operation === "edit" ? editId : "";
    await handleCategoryOperations(payload, editedById).then((res) => {
      setLoading(false);
      if (res.status === "success") {
        toastMessagener.success(
          res.messages.at(res.messages.length - 1).message_en
        );
        resetForm();
        router.push(`/categories`);
      } else {
        toastMessagener.error(
          res.messages.at(res.messages.length - 1).message_en
        );
      }
    });
  };
  const abilitySubmit = useMemo(
    () =>
      Object.values(formData)
        .filter((val) => typeof val === "string")
        .some((item) => item?.length),
    [formData]
  );
  useEffect(() => {
    if (editId && params.operation === "edit") {
      const getCategoryData = async () => {
        console.log("check edit form");
        const categoryData = await getOperationClient(`/categories/${editId}`, {
          method: "GET",
          headers: {
            token: true,
          },
        });
        !categoryData?.data
          ? null
          : setFormData({
              name_en: categoryData?.data?.name?.en,
              name_ar: categoryData?.data?.name?.ar,
              description_en: categoryData?.data?.description?.en,
              description_ar: categoryData?.data?.description?.ar,
              image: categoryData?.data?.image,
              isActive: categoryData?.data?.isActive,
            });
      };
      getCategoryData();
    }
  }, [params, editId]);
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
            formErrors={formErrors}
            setFormErrors={setFormErrors}
          />
          <CheckActiveAndImage
            formData={{
              isActive: formData.isActive,
              image: formData.image,
            }}
            urlsFiles={urlsFiles}
            setUrlsFiles={setUrlsFiles}
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
