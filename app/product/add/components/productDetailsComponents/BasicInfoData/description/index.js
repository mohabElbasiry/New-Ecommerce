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
 
 
 
  {
    lang==="ar"?  
    <div className="flex flex-col">
    
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
 
   
   <DescriptionContent
   content={description_en}
   handleChange={handleChange}
   name={'description_en'}
   />
    
    </div>:null
  }
 

 
</div></>)
}