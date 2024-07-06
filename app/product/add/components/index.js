"use client";
import { useEffect, useState } from "react";
import Headercomponent from "./headercomponent";
import { ProductDetailsComponent } from "./productDetailsComponents";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BasicFormValidation } from "./productDetailsComponents/BasicFormValidationSchema";
import { ProductMainDefaultValue } from "../constants/DefaultProductMainValue";
import { Map } from "immutable";
export const ProductAddMaim = () => {
  const [submitedData, setSubmitedData] = useState({
    ...ProductMainDefaultValue,
  });
  const [state,setState]=useState(Map({ count: 0 }))
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
  useEffect(()=>{

    setState((prev)=>prev.set('count',10).set("loading",false))

  })

  console.log(state.entries(),'gettingCOunt')

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
      <Headercomponent handleSubmit={handleSubmit} submittedData={submitedData}>
        <div className="flex items-end justify-end   gap-2">
          <ProductDetailsComponent
            submitedData={submitedData}
            setSubmitedData={setSubmitedData}
            formData={{
              register,
              reset,
              setValue,
              errors,
              getValues,
              setError,
              clearErrors,
            }}
          />
        </div>
      </Headercomponent>
    </>
  );
};
