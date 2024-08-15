"use client";
import AutoCompelete from "@/components/GlobalUi/autocompelete";
import { InputWithLabelComponent } from "@/components/inputcomponent";
import { MoveLeft } from "lucide-react";
import { useEffect, useState } from "react";
import cities from "../../../../lib/cities.json";
import { CountryCode } from "./countryCodeSelect";

export const LocationForm = ({ locationsData }) => {
  const [refLocations, setRefLocations] = useState([]);
  const [locationMangement, setLocations] = useState({
    locations: [],
    DefaultGovernment: {},
    DefaultCountry: {},
    governments: [],
    DefaultGovernmentRef: [],
  });
  const [choosen, setChoosen] = useState({
    SelectedCountry: {},
    selectedCity: "",
  });
  useEffect(() => {
    const Default = locationsData.find(
      (country) => country?.name?.common === "Saudi Arabia"
    );

    const DefaultGovernment = cities?.data?.find((item) => {
      return item?.country === Default?.name?.common;
    })?.cities;
    const MainubiulateLocations = locationsData.map((country) => {
      return {
        ar: country?.translations.ara.common,
        en: country?.name?.common,
        code: country?.idd?.suffixes
          ?.map((suffix) => country.idd.root + suffix)
          .join(", "),
        flag: country.flags,
      };
    });

    setChoosen({
      ...choosen,
      SelectedCountry: Default,
      selectedCity: DefaultGovernment?.[0],
    });
    console.log(DefaultGovernment, "DefaultGovernment");
    setRefLocations(MainubiulateLocations);
    setLocations({
      locations: MainubiulateLocations,
      DefaultCountry: Default,
      DefaultGovernmentRef: DefaultGovernment,
      DefaultGovernment,
      governments: cities?.data,
    });
  }, []);
  console.log(choosen, "choosen");
  return (
    <div>
      <div className="locationForm">
        <p className="title flex items-center gap-3">
          <MoveLeft />
          Add Location{" "}
        </p>

        <div className="box flex flex-col items-center w-[80%]">
          <AutoCompelete
            array={locationMangement.locations}
            header={"country / region"}
            onChange={(e) => {
              const { name, value } = e.target;

              setLocations((prev) => {
                if (value?.trim() !== "") {
                  const filteredLocation = refLocations.filter(
                    (item) =>
                      item.en?.toLowerCase().includes(value.toLowerCase()) ||
                      item?.ar.includes(value)
                  );

                  return {
                    ...prev,
                    locations: filteredLocation,
                  };
                } else {
                  return refLocations;
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
              setLocations((prev) => {
                return {
                  ...prev,
                  DefaultGovernment: choosen,
                  DefaultGovernment: government?.cities ?? undefined,
                  DefaultGovernmentRef: government?.cities ?? undefined,
                };
              });
            }}
            choosenValue={choosen?.SelectedCountry?.name?.common}
            ShowingItem={`en`}
            parentclassname={`
              w-[90%]
              `}
          />
          <AutoCompelete
            array={
              locationMangement.DefaultGovernment ?? [
                "there's no data for this location",
              ]
            }
            header={"City"}
            onChange={(e) => {
              const { name, value } = e.target;

              setLocations((prev) => {
                if (value?.trim() !== "") {
                  return {
                    ...prev,
                    DefaultGovernment: prev?.DefaultGovernmentRef?.filter(
                      (item) =>
                        item
                          .toLowerCase()
                          .trim()
                          .includes(value.toLowerCase().trim())
                    ),
                  };
                } else {
                  return {
                    ...prev,
                    DefaultGovernment: prev.DefaultGovernmentRef,
                  };
                  ab;
                }
              });
            }}
            onChooseCountry={(choosen, setValue) => {
              setValue(choosen);
              setLocations((prev) => {
                return {
                  ...prev,
                  DefaultGovernment: choosen,
                };
              });
            }}
            choosenValue={choosen?.selectedCity}
            parentclassname={`
              w-[90%]
              `}
          />
          <CountryCode data={locationMangement.locations}
           defaultValue={locationMangement?.DefaultCountry}/>
          <InputWithLabelComponent
            Input
            defaultValue={""}
            isRequired
            label="Name"
            inputCss="!w-[90%]"
            parentCss={`w-[95%] my-3`}
          />
          <InputWithLabelComponent
            Input
            defaultValue={""}
            isRequired
            label="Country/region"
            inputCss="!w-[90%]"
            parentCss={`w-[95%] my-3`}
          />
          <InputWithLabelComponent
            Input
            defaultValue={""}
            isRequired
            label="Address"
            inputCss="!w-[90%]"
            parentCss={`w-[95%] my-3`}
          />
        </div>
      </div>
    </div>
  );
};
