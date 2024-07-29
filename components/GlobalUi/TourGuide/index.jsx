import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React, { useCallback, useState } from "react";
import Joyride, {
  ACTIONS,
  EVENTS,
  ORIGIN,
  STATUS,
} from "react-joyride";
const defaultDataSteps = [
  {
    key: "the First Step",
    value: [
      {
        target: ".add-product-variant",
        content: "click here to add product variant ",
      },
      {
        content: <h2>will create Variant </h2>,

        placement: "center",
        target: ".my-other-step",
      },
    ],
   FunctionSteps: ({  index }) => {
     
        if (index == 0) {
          ("do something in first step");
        } else if (index == 1) {
          ("do something in scound step");
        } else {
          ("do something in onter steps");
        }
      
    },
   FunctionLastSteps: () => {
   
        ("do something in last step");
      
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
   FunctionSteps: ({ key, index }) => {
   
        if (index == 0) {
          ("do something in first step");
        } else if (index == 1) {
          ("do something in scound step");
        } else {
          ("do something in onter steps");
        }
      
    },
   FunctionLastSteps: () => {
     
        ("do something in last step");
      
    },
  },
];

export default function TourGuide({ stepsData = defaultDataSteps }) {
  const [{ run, steps, key ,item}, setState] = useState({
    run: false,
    steps: stepsData?.[0]?.value,
    key: stepsData?.[0]?.key,
    item: stepsData?.[0]
  });

  const handleJoyrideCallback = useCallback(
    (data) => {
      const { action, index, origin, status, type } = data;
      console.log(data, EVENTS, ACTIONS, ORIGIN);
      if (action === ACTIONS.CLOSE && origin === ORIGIN.KEYBOARD) {
        // do something
      }
      item?.FunctionSteps? item?.FunctionSteps({  index }):null;

      if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
        // Update state to advance the tour
        // setStepIndex(index + (action === ACTIONS.PREV ? -1 : 1));
      } else if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
        // You need to set our running state to false, so we can restart if we click start again.
        item?.FunctionLastSteps? item?.FunctionLastSteps():null;
        setState({
          run: false,
          steps: stepsData?.[0]?.value,
          key: stepsData?.[0]?.key,
          item: stepsData?.[0]
        });
      }

      console.groupCollapsed(type);
      //eslint-disable-line no-console
      console.groupEnd();
    },
    [run, key]
  );

  const handleClickStart = (steps) => {
    setState({
      run: true,
      steps: steps?.value,
      key: steps?.key,
      item:steps
    });
  };
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
      <DropdownMenu>
        <DropdownMenuTrigger className="rounded-full fixed bottom-10 right-10">
          <Button  className="rounded-full ">?</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-32 shadow  border  mx-5 bg-white ">
          {stepsData.map((step, index) => (
            <DropdownMenuItem
              key={index + step.key}
              className="cursor-pointer"
              onClick={() => handleClickStart(step)}
            >
              {step.key}{" "}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
