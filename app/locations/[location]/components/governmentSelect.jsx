import AutoCompelete from "@/components/GlobalUi/autocompelete";

export const GovernmentSelect = ({
  DefaultGovernment,
  setLocations,
  state,
  setChoosen,
}) => {
  return (
    <AutoCompelete
      value={state}
      array={DefaultGovernment ?? ["there's no data for this location"]}
      header={"Government"}
      name="state"
      isRequired
      onChange={(e) => {
        const { name, value } = e.target;
        
        setLocations((prev) => {
          if (value?.trim() !== "") {
            return {
              ...prev,
              DefaultGovernment: prev?.DefaultGovernmentRef?.filter((item) =>
                item.toLowerCase().trim().includes(value.toLowerCase().trim())
              ),
            };
          } else {
            return {
              ...prev,
              DefaultGovernment: prev.DefaultGovernmentRef,
            };
          }
        });
      }}
      onChooseCountry={(choosen, setValue) => {
        setValue(choosen);
         setChoosen((prev) => {
          return { ...prev, state: choosen };
        });

        // setLocations((prev) => {
        //   return {
        //     ...prev,
        //     DefaultGovernment: choosen,
        //   };
        // });
      }}
      choosenValue={state}
      parentclassname={`
          w-[97%]
          `}
    />
  );
};
