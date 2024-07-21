import { SortActionComponent } from "@/components/SortComponents/SortAction"

export const SortBy=({setFilters})=>{



  const handleChange = (v) => {
    console.log(v);
    
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