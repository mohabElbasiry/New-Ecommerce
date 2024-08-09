import React, { useState } from "react";
import "flatpickr/dist/flatpickr.min.css";
import "./imputTime.css";
import Flatpickr from "react-flatpickr";
import { produce } from "immer";

export const InputTimePPicker = ({ name, setSubmitedData }) => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="flex items-center divcontainer   ">
      <label
        className=" mr-1 text-xs text-nowrap w-full h-full p-3"
        htmlFor="picker"
      >
        Scheduale Time To Publish
      </label>
      <Flatpickr
        id="picker"
        data-enable-time
        value={date}
        onChange={(selectedDates) => {
          setSubmitedData(
            produce((draft) => {
              draft[name] = selectedDates[0];
            })
          );
        }}
        options={{
          enableTime: true,
          dateFormat: "Y-m-d H:i",
          animate: true,
        }}
        style={{ width: "100%", fontSize: "13px" }}
      />
    </div>
  );
};
