import TextEditor from "@/components/TextEditor/index_2"
import { UpdateAction } from "../../../productVariations/RootFunction/middleWare";
import ReusableTabs from "@/components/shadcntaps";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useState } from "react";
import { DescriptionContent } from "./DescriptionContent";
 
export const Description =({
    description_en,
    description_ar,
    handleAction,
    lang
})=>{    
      const handleChange = (value,name) => {
 
    
        if (name === 'description_ar') {
           const action = {
            type: "UpdatePropertyByNameAndValue",
            payload: { name:'description_ar', value },
            target: "productDetails",
          };
          handleAction(action);
        } else if (name=== 'description_en') {
 
          const action = {
            type: "UpdatePropertyByNameAndValue",
            payload: { name, value },
            target: "productDetails",
          };
          handleAction(action);
        }
      };
   
     
    
 return(
 <>
 

<div>
 

  <div className="hidden sm:block">
    <div className="border-b border-gray-200">
 
  {
    lang==="ar"?  
    <div className="flex flex-col">
    description In Arabic
   
   <DescriptionContent
   content={description_ar}
   handleChange={handleChange}
   name={'description_ar'}
   />
    
    </div>:null
  }
  {
    lang==="en"?  
    <div className="flex flex-col">
        description In English

   
   <DescriptionContent
   content={description_en}
   handleChange={handleChange}
   name={'description_en'}
   />
    
    </div>:null
  }
 

    </div>
  </div>
</div></>)
}