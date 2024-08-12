import { CheckboxD } from "@/components/GlobalUi/checkbox";
import { InputWithLabelComponent } from "@/components/inputcomponent";
import SubCategoriesSelect from "../categoriesWithSub";
import SubCategoriesSelect_2 from "../AllCategoriesWithSub_2";
import { memo } from "react";
import { LocationsContainer } from "./locations";

  const Inventory = ({ register, submitedData, errors }) => {
  return (
    <>
      <p className="title">Inventory</p>
      <div className="box p-3  flex gap-3 flex-col">
        {/* <SubCategoriesSelect_2
          category={submitedData.category}
          register={register}
          error={errors}
        /> */}
      
        <CheckboxD text={`Track Quantity `} />
        <LocationsContainer/>

        <CheckboxD
          text={`Continue selling when out of stock `}
          infoText="This will complete sales when available inventory reaches zero and below."
        />
        <div className="grid grid-cols-3 place-items-center gap-2">
          <InputWithLabelComponent
            label="SKU(optional)"
            PlaceHolder=""
            Input
            min={1}
            MoreInfo
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