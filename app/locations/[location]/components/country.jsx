import AutoCompelete from "@/components/GlobalUi/autocompelete";
import { Search } from "lucide-react";
import { memo } from "react";

const CountrySelect = ({
  setLocations,
  locationRef,
  locations,
  cities,
  setChoosen,
  value,
}) => {
  return (
    <AutoCompelete
      // array={locationMangement.locations}
      Icon={<Search className="!text-[#ddd] px-1 " />}
      array={locations}
      header={"country / region"}
      className="  p-2 w-full rounded mx-2 !h-[32px]"
      name={"country"}
      isRequired
      onChange={(e) => {
        const { name, value } = e.target;

        setLocations((prev) => {
          if (value?.trim() !== "") {
            const filteredLocation = locationRef.filter(
              (item) =>
                item.en?.toLowerCase().includes(value.toLowerCase()) ||
                item?.ar.includes(value)
            );

            return {
              ...prev,
              locations: filteredLocation,
            };
          } else {
            return {
              ...prev,
              locations: locationRef,
            };
          }
        });
      }}
      onChooseCountry={(choosen, setValue) => {
        const government = cities?.data?.find((item) => {
          return (
            item?.country.toLowerCase().trim() ===
            choosen?.en.toLowerCase().trim()
          );
        });
        setValue(choosen.en);
        setChoosen((prev) => ({
          ...prev,
          country: choosen.en,
          state: choosen?.capital,
          code: choosen?.code,
          cca2: choosen?.cca2,
          language: choosen?.languages,
        }));
        setLocations((prev) => {
          return {
            ...prev,
            DefaultGovernment: choosen,
            DefaultGovernment: government?.cities ?? undefined,
            DefaultGovernmentRef: government?.cities ?? undefined,
            DefaultCountry: choosen,
          };
        });
      }}
      choosenValue={value}
      ShowingItem={`en`}
      labelCss={"my-2"}
      parentclassname={`  w-[97%]  my-3 `}
    />
  );
};
export default memo(CountrySelect);
