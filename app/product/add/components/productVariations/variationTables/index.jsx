import { InputWithLabelComponent } from "@/components/inputcomponent";
import { useEffect, useState } from "react";
import { generateQualities } from "./generateQualitiesOptions";
import { getKeysAndValues } from "./getUniqukeysAndValue";
import { TableData } from "./tableBody/tableData";
import { SearchInput } from "./Filters/Search";
import { FiltersKeys_values } from "./Filters/FiltersKeys_values";
import { filterData } from "./Filters/function/FilterFunction";

export const VariationTable = ({ varitions }) => {
  const [autoGenerate, setAutoGenerate] = useState([]);
  const isAr = "ar";
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
    if (varitions?.length) {
      const Refactor = varitions?.map((item) => {
        const { key_en, key_ar, values } = item;

        return {
          key_en,
          key_ar,
          values,
        };
      });
      console.log(varitions,'varitions')
      setAutoGenerate(generateQualities(varitions));
    }
    setAutoGenerate((prev) => {
      if (filters?.filterByValues?.length) {
        const Filtered = filterData(
          generateQualities(varitions),
          filters?.filterByValues
        );
        return Filtered;
      } else {
        return generateQualities(varitions);
      }

      // return FilteredOutByValuesAndKeys;
    });
  }, [filters, varitions]);

  // useEffect(() => {

  // }, [filters, varitions]);

  return (
    <div className="w-[100%] mt-3 bg-[#eeeeee7d] p-2 rounded-3 border shadow-md">
      <div className="flex justify-between items-center px-2">
        <div className="GroupBy flex items-center  text-sm gap-3">
          <p>Group by</p>
          <InputWithLabelComponent
            Input={false}
            PlaceHolder="Group By"
            inputCss="w-fit !p-1 shadow border border-[#ddd]  "
            selectArray={["hello", "dsdsa", "dasdas"]}
          />
        </div>
        <div className="GroupBy flex items-center  text-sm gap-3">
          <p>Sort by</p>
          <InputWithLabelComponent
            Input={false}
            PlaceHolder="Group By"
            inputCss="w-fit !p-1 shadow border border-[#ddd]  "
            selectArray={["hello", "dsdsa", "dasdas"]}
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
        autoGenerate={autoGenerate}
        setAutoGenerate={setAutoGenerate}
      />
    </div>
  );
};
