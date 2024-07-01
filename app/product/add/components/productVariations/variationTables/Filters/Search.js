import { InputWithLabelComponent } from "@/components/inputcomponent"
import { filterData } from "./function/FilterFunction";

export const SearchInput=({setAutoGenerate,autoGenerate,filters})=>{



    const HandleEventSearch = (e) => {
        if (e.target.value.trim() !== "") {
          const SearchValue = autoGenerate?.filter((item) => {
            const searchMatch = item?.values?.some((valueObj) => {
              return (
                valueObj?.value_en.includes(e?.target?.value?.trim()) ||
                valueObj?.value_ar.includes(e?.target?.value?.trim()) ||
                valueObj?.key_en.includes(e?.target?.value?.trim()) ||
                valueObj?.key_ar.includes(e?.target?.value?.trim())
              );
            });
    
            return searchMatch;
          });
          setAutoGenerate(SearchValue);
        } else {
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
        }
      };

    return(<>
     <InputWithLabelComponent
          Input
          inputCss="border border-[#333] !p-1 !px-2 !text-black "
          PlaceHolder="search"
          onChange={(e) => HandleEventSearch(e)}
        />
    </>)
}