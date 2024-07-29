import { SortActionComponent } from "@/components/SortComponents/SortAction"
import { produce } from "immer";

export const SortBy=({setFilters})=>{



  const handleChange = (sortMethod, sortBy) => {
   

    if (sortBy === "Price") {
      setFilters(produce(draft=>{
        draft.sortBy.sortMethod=sortMethod;
        draft.sortBy.sortKey='price';
      }));
    }
    if (sortBy === "Avalibilities") {
       setFilters(produce(draft=>{
        draft.sortBy.sortMethod=sortMethod;
        draft.sortBy.sortKey='quantity';
      }));
    }
    if (sortBy === "Varients Name ") {
        // setFilters('name', "key_en");
        setFilters(produce(draft=>{
          draft.sortBy.sortMethod=sortMethod;
          draft.sortBy.sortKey='key_en';
        }));
    }
  };
    return(<>
    
    <SortActionComponent 
            label={"sort by"}
            menu={[
              {
                label: "Price",
              },
              {
                label: "Avalibilities",
              },
              {
                label: "Varients Name",
              },
            ]}
            handleValueChange={handleChange}
          />
    </>)
}