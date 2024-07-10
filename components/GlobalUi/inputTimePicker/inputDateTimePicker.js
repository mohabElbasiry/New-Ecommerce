import React, { useState } from "react";
import "flatpickr/dist/flatpickr.min.css";
import "./imputTime.css";
import Flatpickr from "react-flatpickr";

export const InputTimePPicker = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="flex items-center divcontainer  ">
      <label className=" mr-1 text-sm text-nowrap" htmlFor="picker">Scheduale Time To Publish</label>

      <Flatpickr
      id="picker"
        data-enable-time
        value={date}
        onChange={(selectedDates) => {
          setDate(selectedDates[0]);
        }}
        options={{
          enableTime: true,
          dateFormat: "Y-m-d H:i",
          animate: true,
        }}
        style={{ width: "100%" }}
      />
    </div>
  );
};
