import { CheckboxD } from "@/components/GlobalUi/checkbox";
import { InputWithLabelComponent } from "@/components/inputcomponent";
import SubCategoriesSelect from "./categoriesWithSub";
import SubCategoriesSelect_2 from "./AllCategoriesWithSub_2";

export const Inventory = ({ register ,submitedData,errors}) => {
  return (
    <>
      <p className="title">Inventory</p>
      <div className="box p-3  flex gap-3 flex-col">
      <SubCategoriesSelect_2
        submitedData={submitedData}
        register={register}
        error={errors}
      /> 
<CheckboxD
  text={`Continue selling when out of stock `}
  infoText="This will complete sales when available inventory reaches zero and below."
/>
<CheckboxD text={`Track Quantity `} />

<div className="grid grid-cols-3 place-items-center gap-2">
  <InputWithLabelComponent
    label="Quantity"
    PlaceHolder=""
    Input
    inputType="number"
    register={{ ...register("Quantity") }}
    min={0}
  />
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
    labelcss="text-sm mb-1"
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
