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
import { SortComponent } from "./Filters/sort";
import { CollapseView } from "../collapseView";

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
 
  useEffect(() => {
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
  useEffect(() => {
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
      console.log(prev,'dassssssssssssssssetState')
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
  }, [filters, varitions]);
  return (
    <div
      className="w-[100%] mt-3 bg-[#eeeeee7d]  
     rounded-xl  p-2 rounded-3 border shadow-md"
    >
      <div className="flex justify-between items-center px-2">
        <GroupByFunction
          varitions={varitions}
          setAutoGenerate={setAutoGenerate}
          setBeforeFiltered={setBeforeFiltered}
          setOrder={setOrder}
        />
        <div className="GroupBy flex items-center  text-sm gap-3">
          <SortComponent
            setAutoGenerate={setAutoGenerate}
            setBeforeFiltered={setBeforeFiltered}
            autoGenerate={autoGenerate}
          />
        </div>
      </div>
      <div className="searchSortCOmponent">
        <SearchInput
          setAutoGenerate={setAutoGenerate}
          autoGenerate={autoGenerate}
          filter={filters}
          setBeforeFiltered={setBeforeFiltered}
          varitions={varitions}

        />
        <FiltersKeys_values setFilters={setFilters} varitions={varitions} />
      </div>
      {/* //render if only CollapseView */}

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
