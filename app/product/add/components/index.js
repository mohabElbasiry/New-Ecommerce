"use client";
import { useCallback, useEffect, useState } from "react";
import Headercomponent from "./headercomponent";
import { ProductDetailsComponent } from "./productDetailsComponents";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BasicFormValidation } from "./productDetailsComponents/BasicFormValidationSchema";
import { ProductMainDefaultValue } from "../constants/DefaultProductMainValue";
import Joyride, {
  ACTIONS,
  EVENTS,
  ORIGIN,
  STATUS,
  CallBackProps,
} from "react-joyride";
import { Button } from "@/components/ui/button";
import { produce } from "immer";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
const stepsVariant = [
  {
    target: ".add-product-variant",
    content: "click here to add product variant ",
  },
  {
    content: <h2>will create Variant </h2>,

    placement: "center",
    target: ".add-product-variant",
  },
  {
    target: ".add-name-variant",
    content: "enter here to add name variant",
  },
  {
    target: ".add-values-variant",
    content: "enter here to add name variant",
  }, {
    target: ".done-variant",
    content: "click here to create the first variant",
  },

]
const stepsUploadFile = [
  {
    target: ".my-other-step",
    content: "This another awesome feature!",
  },

];
// {
//   target: ".my-other-step",
//   content: "This another awesome feature!",
// },
// {
//   target: '.my-first-step',
//   content: 'This is my awesome feature!',
// },
// {
//   target: '.my-other-step',
//   content: 'This another awesome feature!',
// },
export const ProductAddMaim = () => {
  const [submitedData, setSubmitedData] = useState({
    ...ProductMainDefaultValue,
  });
  console.log(submitedData,'submitedDatasubmitedData')
  const [data, setData] = useState({
    Data: [],
    BeforeFilterData: [],
  });
  const [{ run, steps }, setState] = useState({
    run: false,
    steps: stepsVariant
  });
  const [stepIndex, setStepIndex] = useState(0);

  const handleJoyrideCallback = useCallback((data) => {
    const { action, index, origin, status, type } = data;
    console.log(data, EVENTS, ACTIONS, ORIGIN);
    if (action === ACTIONS.CLOSE && origin === ORIGIN.KEYBOARD) {
      // do something
    }
    if (index == 1) {
      console.log('object')
      setSubmitedData(
        produce((draft) => {
          if(draft?.productvaritions?.variants?.length>=1){return}else{
            draft?.productvaritions?.variants?.push({
              isColor: "",
  
              key_en: "colors",
              key_ar: "colors",
              isTest:true,
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
            })
          }

         
      
        })
      );

    }else if (index == 5){

    }

    if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
      // Update state to advance the tour
      // setStepIndex(index + (action === ACTIONS.PREV ? -1 : 1));
    } else if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      // You need to set our running state to false, so we can restart if we click start again.
     
      setState({
        run: false,
        steps:stepsVariant
      });
    }

    console.groupCollapsed(type);
    //eslint-disable-line no-console
    console.groupEnd();
  },[submitedData.productvaritions?.variants])

  const handleClickStart = (value) => {
    setState({
      run: true,
      steps:value
    });
  };
  console.log("rerender hassan", data);
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
      <Joyride
        callback={handleJoyrideCallback}
        continuous
        run={run}
        scrollToFirstStep
        showProgress
        showSkipButton
        steps={steps}
        styles={{
          options: {
            zIndex: 10000,
          },
        }}
      />

      <Headercomponent handleSubmit={handleSubmit}>
        <div className="flex items-end justify-end   gap-1">
          {console.log(submitedData, "submitedData123231321")}
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
              isSubmitting,
            }}
            data={data}
            setData={setData}
          />
        </div>
      </Headercomponent>
      <DropdownMenu >
  <DropdownMenuTrigger className="rounded-full fixed bottom-10 right-10"><Button className="rounded-full ">?</Button></DropdownMenuTrigger>
  <DropdownMenuContent className="w-32 shadow  border  mx-5 bg-white "
  >

    <DropdownMenuItem className="cursor-pointer" onClick={()=>handleClickStart(stepsVariant)}>Variant</DropdownMenuItem>
    <DropdownMenuItem className="cursor-pointer" onClick={()=>handleClickStart(stepsUploadFile)}>upload file</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

      {/*  */}
    </>
  );
};
