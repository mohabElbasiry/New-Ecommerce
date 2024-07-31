"use client";
import {  useState } from "react";
import Headercomponent from "./headercomponent";
import { ProductDetailsComponent } from "./productDetailsComponents";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BasicFormValidation } from "./productDetailsComponents/BasicFormValidationSchema";
import { ProductMainDefaultValue } from "../constants/DefaultProductMainValue";

import { produce } from "immer";

import { generateQualities } from "./productVariations/collapseView/functions/GenerateQualities";
import { shapeData } from "./productVariations/collapseView/functions/datashape";
import TourGuide from "@/components/GlobalUi/TourGuide";




export const ProductAddMaim = () => {
  const [submitedData, setSubmitedData] = useState({
    ...ProductMainDefaultValue,
  });

  const [data, setData] = useState({
    Data: [],
    BeforeFilterData: [],
  });

  const dataSteps = [
    {
      key: "steps Variant",
      value:[
        {
          target: ".add-product-variant",
          content: "click here to add product variant ",
        },
        {
          content: <h2>will create Variant </h2>,
      
          placement: "center",
          target: ".my-other-step",
        },
        {
          target: ".add-name-variant",
          content: "enter here to add name variant",
        },
        {
          target: ".add-values-variant",
          content: "enter here to add values variant",
        },
        {
          target: ".done-variant",
          content: "click here to create the first variant",
        }, {
          content: "now create variant done ",
          target: ".product-variant",
        },
      ],
      FunctionSteps: ({ index }) => {
      
          if (index == 1) {
            console.log("object");
            setSubmitedData(
              produce((draft) => {
                if (draft?.productvaritions?.variants?.length >= 1) {
                  return;
                } else {
                  draft?.productvaritions?.variants?.push({
                    isColor: "",
    
                    key_en: "colors",
                    key_ar: "colors",
                    isTest: true,
                    values: [
                      {
                        value_ar: "red",
                        value_en: "red",
                        color: "",
                      },
                      {
                        value_ar: "blue",
                        value_en: "blue",
                        color: "",
                      },
                    ],
                    edit: true,
                  });
                }
              })
            );
          } else if (index == 5) {
            setSubmitedData(
              produce((draft) => {
                const Updated = draft.productvaritions.variants?.map(item=>({...item,edit:false}));
                console.log(Updated, "UpdatedUpdated");
                draft.productvaritions.variants = Updated;
                draft.productvaritions.REfvariants = Updated;
                const dataShape = generateQualities(
                  draft.productvaritions.varitionsValues?.flatMap(
                    (item) => item.values
                  ) || [],
                  Updated || []
                );
                draft.productvaritions.varitionsValues = shapeData(
                  dataShape || [],
                  Updated || []
                );
              })
            );
          }
        },
      
     FunctionLastSteps: () => {
      setSubmitedData(
        produce((draft) => {
          const Updated = draft.productvaritions.variants?.filter(item=>(!item.isTest));
          console.log(Updated, "UpdatedUpdated");
          draft.productvaritions.variants = Updated;
          draft.productvaritions.REfvariants = Updated;
          
          draft.productvaritions.varitionsValues = Updated
        })
      );
      },
    },
    {
      key: "stepsOther",
      value: [
        {
          target: ".my-other-step",
          content: "This another awesome feature!",
        },
      ], 
    },
  ];
 

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
    <TourGuide  stepsData={dataSteps} />

      <Headercomponent handleSubmit={handleSubmit}>
        <div className="flex items-end justify-end   gap-1">
          
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
              isSubmitting,
            }}
            data={data}
            setData={setData}
          />
        </div>
      </Headercomponent>
    

      
    </>
  );
};
