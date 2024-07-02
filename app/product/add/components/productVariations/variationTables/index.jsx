import { InputWithLabelComponent } from "@/components/inputcomponent";
import { memo, useEffect, useMemo, useState } from "react";
import { generateQualities } from "./generateQualitiesOptions";
import { getKeysAndValues } from "./getUniqukeysAndValue";
import { TableData } from "./tableBody/tableData";
import { SearchInput } from "./Filters/Search";
import { FiltersKeys_values } from "./Filters/FiltersKeys_values";
import { filterData } from "./Filters/function/FilterFunction";
import { CustomDialoge } from "@/components/Modal";
import { GroupByFunction } from "./Filters/GroupBy";

const VariationTable = ({
  varitions,
  setSubmitedData = () => {},
  submitedData = {},
}) => {
  const [autoGenerate, setAutoGenerate] = useState([]);
  const [BeforeFiltered, setBeforeFiltered] = useState([]);
  const isAr = "ar";
  const [order, setOrder] = useState({ order: "", orderVariants: [] });
  const [filters, setFilters] = useState({
    filterByValues: [],
    setSearch: "",
  });
  const updatedVaration = varitions?.map((item) => {
    return {
      key_en: item?.option,
    };
  });
  useEffect(() => {
    console.log(submitedData);
    if (localStorage?.getItem("saved")) {
      const items = JSON.parse(localStorage?.getItem("saved"));
      let data =
        typeof submitedData?.VariendData?.Data == "object" &&
        Object.keys(submitedData?.VariendData?.Data)?.length
          ? submitedData?.VariendData?.Data
          : items;
      setAutoGenerate(data);
      setBeforeFiltered(items);
    }
  }, []);

  useEffect(() => {
    setSubmitedData((prev) => {
      localStorage?.setItem(
        "submitedItem",
        JSON.stringify({ SubmitedValues: BeforeFiltered })
      );

      return {
        ...prev,
        VariendData: {
          ...prev.VariendData,
          varitions,
          Data: BeforeFiltered,
        },
      };
    });
  }, [BeforeFiltered, varitions]);
  useMemo(() => {
    if (varitions?.length) {
      setAutoGenerate((prev) => {
        return generateQualities(prev, varitions);
      });
      setBeforeFiltered((prev) => {
        localStorage.setItem(
          "saved",
          JSON.stringify(generateQualities(prev, varitions))
        );
        localStorage?.setItem("list", JSON.stringify(varitions));

        return generateQualities(prev, varitions);
      });
    }
    setAutoGenerate((prev) => {
      if (filters?.filterByValues?.length) {
        const Filtered = filterData(
          generateQualities(BeforeFiltered || [], varitions),
          filters?.filterByValues
        );
        return Filtered;
      } else {
        return generateQualities(BeforeFiltered || [], varitions);
      }
      // return FilteredOutByValuesAndKeys;
    });
  }, [JSON.stringify(filters), JSON.stringify(varitions)]);

  return (
    <div className="w-[100%] mt-3 bg-[#eeeeee7d] p-2 rounded-3 border shadow-md">
      <div className="flex justify-between items-center px-2">
        <GroupByFunction
          varitions={varitions}
          setAutoGenerate={setAutoGenerate}
          setBeforeFiltered={setBeforeFiltered}
          setOrder={setOrder}
        />
        <div className="GroupBy flex items-center  text-sm gap-3">
          <p>Sort by</p>
          <InputWithLabelComponent
            Input={false}
            PlaceHolder="sort by"
            inputCss="w-fit !p-1 shadow border border-[#ddd]  "
            selectArray={varitions?.map((item) => item?.key_en)}
          />
        </div>
      </div>
      <div className="searchSortCOmponent">
        {/* <InputWithLabelComponent
          Input
          inputCss="border border-[#333] !p-1 !px-2 !text-black "
          PlaceHolder="search"
          onChange={(e) => HandleEventSearch(e)}
        /> */}
        <SearchInput
          setAutoGenerate={setAutoGenerate}
          autoGenerate={autoGenerate}
          filter={filters}
        />
        <FiltersKeys_values setFilters={setFilters} varitions={varitions} />
      </div>

      <TableData
        autoGenerate={autoGenerate?.filter((item) => item?.values.length)}
        setAutoGenerate={setAutoGenerate}
        setBeforeFiltered={setBeforeFiltered}
      />
    </div>
  );
};
export default memo(VariationTable);
// , (prevProps, nextProps) => {
//   return JSON.stringify(prevProps.varitions) !== JSON.stringify(nextProps.varitions);
// }
