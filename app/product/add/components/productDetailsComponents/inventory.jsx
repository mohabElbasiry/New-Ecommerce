import { CheckboxD } from "@/components/GlobalUi/checkbox";
import { InputWithLabelComponent } from "@/components/inputcomponent";

export const Inventory = ({ register }) => {
  return (
    <>
      <p className="font-semibold">Inventory</p>

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
          label="Barcode (ISBN, UPC, GTIN, etc.)"
          Input
          min={1}
          MoreInfo
          MoreInfoText={`Barcode (ISBN, UPC, GTIN) - Barcodes are typically used by resellers. 
           `}
        />{" "}
      </div>
    </>
  );
};
