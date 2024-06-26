import { InputWithLabelComponent } from "@/components/inputcomponent";
import { useState, useEffect, useCallback, useMemo } from "react";

export default function ProductVariation() {
  const [options, setOptions] = useState([]);
  const [currentOption, setCurrentOption] = useState("");
  const [currentValues, setCurrentValues] = useState([""]);
  const [error, setError] = useState([]);
  const handleOptionChange = (event) => {
    setCurrentOption(event.target.value);
  };
  const handleKeyDown = (event, index) => {
    if (event.keyCode === 8 && event.target.value === "") {
      if (currentValues?.some((item, idx) => idx === index)) {
        if (event?.target?.value === "") {
          setTimeout(()=>{setCurrentValues((prev) => {
            return prev?.filter((_, idx) => idx !== index);
          });},100)
        }
      }
    }
  };
  const handleValueChange = (event, index) => {

    if (
      event?.target?.value !== "" &&
      currentValues?.length &&
      currentValues?.some((item) => item.trim() === event.target.value)
    ) {
      setError((prev) => {
        if (prev?.length) {
          const founded = prev?.find((item, idx) => item?.index === index);
          if (founded) {


            return prev;
          }
        }
        const newObj = {
          index: index,
          Message: "This Value Already Exist",
        };
        return [...prev, newObj];
      });
    }
    const founded = error?.find((item, idx) => item?.index === index);

    if (founded) {
      console.log("Founded", founded);
      setError((prev) =>
        prev?.filter((item, idx) => item?.index !== founded?.index)
      );
    }
    const newValues = [...currentValues];
    newValues[index] = event.target.value;
    setCurrentValues(newValues);
    updateOptions(currentOption, newValues);
  };

  const updateOptions = (optionName, optionValues) => {
    if (optionName.trim() !== "") {
      const newOptions = [...options];
      const optionIndex = newOptions.findIndex(
        (option) => option.name === optionName
      );

      if (optionIndex !== -1) {
        newOptions[optionIndex].values = optionValues.filter(
          (value) => value.trim() !== ""
        );
      } else {
        newOptions.push({
          name: optionName,
          values: optionValues.filter((value) => value.trim() !== ""),
        });
      }
      setOptions(newOptions);
    }
  };

  useEffect(() => {
    if (currentValues[currentValues.length - 1].trim() !== "") {
      setCurrentValues([...currentValues, ""]);
    }
  }, [currentValues]);
  const HandleDelete = useCallback(
    (index) => {
      setCurrentValues((prev) => {
        const DeletedItem = prev?.filter((item, idx) => idx !== index);
        return DeletedItem;
      });
    },
    [JSON.stringify(currentValues)]
  );
  return (
    <div className="w-[60%]">
      <p>Option Name</p>

      <div>
        <InputWithLabelComponent
          Input
          type="text"
          value={currentOption}
          onChange={handleOptionChange}
          placeholder="Enter option name"
        />
        <p>Option values</p>
        {currentValues.map((value, index) => (
          <div className="flex gap-2 relative w-fit">
            <InputWithLabelComponent
              Input
              type="text"
              key={index}
              value={value}
              onChange={(event) => handleValueChange(event, index)}
              placeholder={`Enter value ${index + 1}`}
              isRequired
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
            {error?.some((item) => item?.index === index)
              ? error?.find((item) => item.index === index)?.Message
              : ""}
            {value !== "" && (
              <button
                onClick={() => HandleDelete(index)}
                className="w-[25px] absolute right-3 top-[30%]"
              >
                <img src="/trash.svg" />
              </button>
            )}
          </div>
        ))}
      </div>

      <div></div>
    </div>
  );
}
