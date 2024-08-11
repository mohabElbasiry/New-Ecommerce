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
    handleAction
})=>{
      const [lang,setLang]=useState('ar')
    
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
 {/*
  Heads up! 👋

  Plugins:
    - @tailwindcss/forms
*/}

<div>
  <div className="sm:hidden">
    <label htmlFor="Tab" className="sr-only">Tab</label>

    <select id="Tab" className="w-full rounded-md border-gray-200">
      <option>Settings</option>
      <option>Messages</option>
      <option>Archive</option>
      <option select>Notifications</option>
    </select>
  </div>

  <div className="hidden sm:block">
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex gap-6" aria-label="Tabs">
        <a
          href="#"
          className="shrink-0 border-b-2 border-transparent px-1 pb-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
        
        onClick={()=>setLang('en')}>
          En
        </a>

        <a
          href="#"
          className="shrink-0 border-b-2 border-transparent px-1 pb-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          onClick={()=>setLang('ar')}

      >
          Ar
        </a>

       
      </nav>
{
  console.log(description_ar,description_en,'adsssssssssssssssssssssss')
}
  {
    lang==="ar"?  
    <div className="flex flex-col">
    description_en
   
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
    description_en
   
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