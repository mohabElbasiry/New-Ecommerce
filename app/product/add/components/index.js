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
  const [data, setData] = useState({
    Data: [],
    BeforeFilterData: [],
  });
  console.log("rerender hassan", data);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    setError,
    clearErrors,

    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(BasicFormValidation("en")),
  });

  // useEffect(() => {
  //   const SubmitedData = localStorage.getItem("submitedItem");
  //   if (submitedData) {
  //     const ParsingData = JSON.parse(SubmitedData);
  //     if (ParsingData?.SubmitedValues?.length) {
  //       setSubmitedData(ParsingData?.SubmitedValues);
  //     }
  //   }
  // }, []);
  return (
    <>
      <Headercomponent handleSubmit={handleSubmit}>
        <div className="flex items-end justify-end   gap-1">
          {
            console.log(submitedData,'submitedData123231321')
          }
          <ProductDetailsComponent
            submitedData={submitedData}
            setSubmitedData={setSubmitedData}
            formData={{
              register,
              reset,
              setValue,
              getValues,
              errors,
              setError,
              clearErrors,
              isSubmitting
            }}
            data={data}
            setData={setData}
          />
        </div>
      </Headercomponent>
    </>
  );
};
