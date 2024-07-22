"use client";
import { useEffect, useState } from "react";
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
const steps = [
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
  },
  {
    target: ".my-other-step",
    content: "This another awesome feature!",
  },
];

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
  const [data, setData] = useState({
    Data: [],
    BeforeFilterData: [],
  });
  // const [{ run, steps }, setState] = useState({
  //   run: true,
  //   steps: [
  //     {
  //       content: <h2>Let's begin our journey!</h2>,
  //       locale: { skip: <strong aria-label="skip">S-K-I-P</strong> },
  //       placement: 'center',
  //       target: '.add-product-variant',
  //     },
  //     {
  //       content: <h2>Sticky elements</h2>,
  //       floaterProps: {
  //         disableAnimation: true,
  //       },
  //       spotlightPadding: 20,
  //       target: '.star-burst',
  //     },
  //     {
  //       content: 'These are our super awesome projects!',
  //       placement: 'bottom',
  //       styles: {
  //         options: {
  //           width: 300,
  //         },
  //       },
  //       target: '.demo__projects h2',
  //       title: 'Our projects',
  //     },
  //     {
  //       content: (
  //         <div>
  //           You can render anything!
  //           <br />
  //           <h3>Like this H3 title</h3>
  //         </div>
  //       ),
  //       placement: 'top',
  //       target: '.demo__how-it-works h2',
  //       title: 'Our Mission',
  //     },
  //     {
  //       content: (
  //         <div>
  //           <h3>All about us</h3>
  //           <svg
  //             height="50px"
  //             preserveAspectRatio="xMidYMid"
  //             viewBox="0 0 96 96"
  //             width="50px"
  //             xmlns="http://www.w3.org/2000/svg"
  //           >
  //             <g>
  //               <path
  //                 d="M83.2922435,72.3864207 C69.5357835,69.2103145 56.7313553,66.4262214 62.9315626,54.7138297 C81.812194,19.0646376 67.93573,0 48.0030634,0 C27.6743835,0 14.1459311,19.796662 33.0745641,54.7138297 C39.4627778,66.4942237 26.1743334,69.2783168 12.7138832,72.3864207 C0.421472164,75.2265157 -0.0385432192,81.3307198 0.0014581185,92.0030767 L0.0174586536,96.0032105 L95.9806678,96.0032105 L95.9966684,92.1270809 C96.04467,81.3747213 95.628656,75.2385161 83.2922435,72.3864207 Z"
  //                 fill="#000000"
  //               />
  //             </g>
  //           </svg>
  //         </div>
  //       ),
  //       placement: 'left',
  //       target: '.demo__about h2',
  //     },
  //   ],
  // });
  const [stepIndex, setStepIndex] = useState(0);

  const handleJoyrideCallback = (data) => {
    const { action, index, origin, status, type } = data;
    console.log(data, EVENTS, ACTIONS, ORIGIN);
    if (action === ACTIONS.CLOSE && origin === ORIGIN.KEYBOARD) {
      // do something
    }
    if (index == 1) {
      setSubmitedData(
        produce((draft) => {
          draft?.productvaritions?.variants?.push({
            isColor: "",

            key_en: "",
            key_ar: "",

            values: [
              {
                value_ar: "",
                value_en: "",
                color: "",
              },
            ],
            edit: true,
          });
        })
      );
    }

    if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
      // Update state to advance the tour
      setStepIndex(index + (action === ACTIONS.PREV ? -1 : 1));
    } else if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      // You need to set our running state to false, so we can restart if we click start again.
      // setRun(false);
    }

    console.groupCollapsed(type);
    //eslint-disable-line no-console
    console.groupEnd();
  };

  // const handleClickStart = () => {
  //   setState({
  //     run: true,
  //   });
  // };
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
        // run={run}
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
      {/* <Button className="rounded-full fixed bottom-10 right-10" onClick={handleClickStart}>?</Button> */}
    </>
  );
};
