"use client";
import AutoCompelete from "@/components/GlobalUi/autocompelete";
import { InputWithLabelComponent } from "@/components/inputcomponent";
import { MoveLeft } from "lucide-react";
import {
  useActionState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import cities from "../../../../lib/cities.json";
import { CountryCode } from "./countryCodeSelect";
import { MainublateData } from "../functions/DataEdit";
import CountrySelect from "./country";
import { GovernmentSelect } from "./governmentSelect";
import { CreateLocationAction } from "@/actions/createLocation";

const initialchoosen = {
  name: "",
  address: "",
  country: {},
  city: "",
  errorInput: [],
  isError: false,
  errorMessage: "This Feild is Required",
  postalCode: "",
  phone: "",
  apertment: "",
  code: "",
  state: "",
  isActive: false,
  isDefault: false,
};
export const LocationForm = ({ locationsData }) => {
  const locationRef = useCallback(MainublateData(locationsData), []);
  const [locationMangement, setLocations] = useState({
    locations: [],
    DefaultGovernment: {},
    DefaultGovernmentRef: [],
  });
  const [choosen, setChoosen] = useState(initialchoosen);

  const updateFeild = useCallback((e) => {
    const { name, value } = e.target;
    setChoosen((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }, []);
  useEffect(() => {
    const Default = locationsData.find(
      (country) => country?.name?.common === "Saudi Arabia"
    );
    const DefaultGovernment = cities?.data?.find((item) => {
      return item?.country === Default?.name?.common;
    })?.cities;

    //if there is data
    console.log(Default?.languages, "asddddddddddddddd");
    setChoosen({
      ...choosen,
      country: Default?.name?.common,
      code: Default?.idd?.suffixes
        ?.map((suffix) => Default.idd.root + suffix)
        .toString(),
      state: Default?.capital?.toString(),
      cca2: Default?.cca2,
      // language:Object.keys(),
    });

    setLocations({
      locations: locationRef,
      DefaultGovernmentRef: DefaultGovernment,
      DefaultGovernment,
    });
  }, []);
  function checkEmptyFields(fields) {
    const emptyFields = [];

    for (const [key, value] of Object.entries(fields)) {
      if (!value) {
        emptyFields.push(key);
      }
    }
    return emptyFields.length ? emptyFields : null;
  }
  console.log(choosen, "choosemsaddddddd");
  return (
    <div>
      <div className="locationForm flex flex-col gap-6 w-[70%] m-auto ">
        <p className="title flex items-center gap-3">
          <MoveLeft />
          Add Location
        </p>
        <form
          className="flex flex-col gap-3 "
          action={async (formData) => {
            const emptyFeilds = checkEmptyFields({ ...choosen });
            const { errorInput, isError, errorMessage, code, ...others } =
              choosen;
            const DeleteEmpty = Object.entries(others).filter(
              ([key, value]) => !emptyFeilds.some((item) => item === key)
            );
            const ToBackend = Object.fromEntries(DeleteEmpty);

            try {
              const Action = await CreateLocationAction(ToBackend);
              const res = await Action;
              console.log(res, "resadsssssssssssssssssssss");
            } catch (err) {}
          }}
        >
          <div className="box flex flex-col items-center   py-3">
            <InputWithLabelComponent
              Input
              isRequired
              PlaceHolder="Location name"
              description={{
                descriptionText:
                  "Give this location a short name to make it easy to identify. You’ll see this name in areas like orders and products. If this location offers in-store pickup, it will be visible to your customers at checkout and in notifications.",
                descriptionCss: "text-sm my-2 text-[#7E7E7E]",
              }}
              parentCss={"w-[97%]"}
              label="Name Of Location"
              name="name"
              onChange={updateFeild}
              value={choosen?.name}
            />

            <CountrySelect
              cities={cities}
              locations={locationMangement?.locations}
              locationRef={locationRef}
              setChoosen={setChoosen}
              setLocations={setLocations}
              value={choosen?.country}
            />
            <InputWithLabelComponent
              Input
              defaultValue={""}
              isRequired
              label="Address"
              inputCss="!w-[90%]"
              parentCss={`w-[97%] my-1`}
              labelcss="my-1"
              name={"address"}
              onChange={updateFeild}
              value={choosen?.address}
            />
            <InputWithLabelComponent
              Input
              defaultValue={""}
              isRequired
              label="Apartment, suite, etc"
              inputCss="!w-[90%]"
              parentCss={`w-[97%] my-1`}
              labelcss="my-1"
              onChange={updateFeild}
              name={"apertment"}
              value={choosen?.apertment}
            />

            <div className=" flex items-center gap-3 w-full px-5">
              <InputWithLabelComponent
                Input
                defaultValue={""}
                label="city"
                parentCss={`w-[100%] my-1`}
                labelcss="my-1"
                onChange={updateFeild}
                name={"city"}
                value={choosen?.city}
              />
              <GovernmentSelect
                DefaultGovernment={locationMangement?.DefaultGovernment}
                state={choosen?.state}
                setLocations={setLocations}
                setChoosen={setChoosen}
                value={choosen?.state}
              />
            </div>
            <InputWithLabelComponent
              Input
              defaultValue={""}
              label="Postal code"
              inputCss="!w-[90%]"
              parentCss={`w-[97%] my-1`}
              labelcss="my-1"
              onChange={updateFeild}
              name={"postalCode"}
              value={choosen?.postalCode}
            />
            <CountryCode
              data={locationRef}
              setChoosen={setChoosen}
              code={choosen?.code}
              value={choosen?.code}
            />
          </div>

          <div className="Footer flex justify-end gap-2   ">
            <button
              className="bg-[#eee] p-2 rounded-md 
        h-[30px] text-sm  capitalize flex items-center
         text-black hover:bg-[#fff] hover:text-black border !border-[#ddd] "
              type="button"
            >
              deactivate
            </button>
            <button
              className="bg-[#333] p-2 rounded-md 
        h-[30px] text-sm  capitalize flex items-center text-white hover:bg-[#fff] hover:text-black"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
