import { CheckboxD } from "@/components/GlobalUi/checkbox";
import { InputWithLabelComponent } from "@/components/inputcomponent";
import SubCategoriesSelect from "../categoriesWithSub";
import SubCategoriesSelect_2 from "../AllCategoriesWithSub_2";
import { memo, useCallback } from "react";
import { LocationsContainer } from "./locations";
import { UpdateAction } from "../../../productVariations/RootFunction/middleWare";

  const Inventory = ({inventory,setSubmitedData}) => {
    console.log(inventory,'inventory');
    const {trackQuantity=true,continue_out_stock=false,locations=[],sku="",barcode=""}=inventory
    const handleAction = useCallback((action) => {
      UpdateAction(action, setSubmitedData);
    },[])
  

    const UpdateProperty= useCallback(({name,value})=>{
      console.log('object');

      handleAction({
        type: "UpdatePropertyByNameAndValue",
        payload: { name,value },
        target: "Stock",
      })
    },[])
      const handleCheckBox= useCallback(
        (name,value)=>{
          UpdateProperty({name,value})
         } ,[])
   
  return (
    <>
      <p className="title">Inventory</p>
      <div className="box p-4 flex gap-3 flex-col ">
        {/* <SubCategoriesSelect_2
          category={submitedData.category}
          register={register}
          error={errors}
        /> */}
      
        <CheckboxD checked={trackQuantity} 
        text={`Track Quantity `}   
        handleChange={handleCheckBox.bind(null,'trackQuantity')} />
        <LocationsContainer trackQuantity={trackQuantity}/>

        <CheckboxD
         handleChange={handleCheckBox.bind(null,'continue_out_stock')}
          text={`Continue selling when out of stock `}
          checked={continue_out_stock}
          infoText="This will complete sales when available inventory reaches zero and below."
        />
        <div className="grid grid-cols-3 place-items-center gap-4">
          <InputWithLabelComponent
            label="SKU(optional)"
            PlaceHolder=""
            Input
            min={1}
          
            MoreInfoText="A SKU, which stands for Stock Keeping Unit, is a unique 
    identifier for each of your products that makes it easier to track inventory.
   .
."
          />
          <InputWithLabelComponent
            label="Barcode"
            Input
            min={1}
            MoreInfo
            MoreInfoText={`Barcode (ISBN, UPC, GTIN) - Barcodes are typically used by resellers. 
     `}
          />{" "}
        </div>
      </div>
    </>
  );
};
export default memo(Inventory)