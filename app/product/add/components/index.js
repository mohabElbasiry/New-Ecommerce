"use client";
import { useEffect, useState } from "react";
import Headercomponent from "./headercomponent";
import { ProductDetailsComponent } from "./productDetailsComponents";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BasicFormValidation } from "./productDetailsComponents/BasicFormValidationSchema";
import { ProductMainDefaultValue } from "../constants/DefaultProductMainValue";
export const ProductAddMaim = () => {
  const [submitedData, setSubmitedData] = useState({
    ...ProductMainDefaultValue,
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    clearErrors,

    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(BasicFormValidation("en")),
  });

  useEffect(() => {
    const SubmitedData = localStorage.getItem("submitedItem");
    if (submitedData) {
      const ParsingData = JSON.parse(SubmitedData);
      if (ParsingData?.SubmitedValues?.length) {
        setSubmitedData(ParsingData?.SubmitedValues);
      }
    }
  }, []);
  return (
    <>
      <Headercomponent handleSubmit={handleSubmit}>
        <div className="flex items-end justify-end   gap-1">
          <ProductDetailsComponent
            submitedData={submitedData}
            setSubmitedData={setSubmitedData}
            formData={{
              register,
              reset,
              setValue,
              errors,
              setError,
              clearErrors,
              isSubmitting
            }}
          />
        </div>
      </Headercomponent>
    </>
  );
};
