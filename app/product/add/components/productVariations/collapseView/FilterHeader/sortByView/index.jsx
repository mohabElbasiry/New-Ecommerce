import { SortActionComponent } from "@/components/SortComponents/SortAction"

export const SortBy=()=>{



  const handleChange = () => {};
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