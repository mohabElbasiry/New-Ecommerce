import { InputWithLabelComponent } from "@/components/inputcomponent";

export const Inventory = () => {
  return (
    <>
      <p className="font-semibold">Inventory</p>

      <div className="grid grid-cols-2 gap-2">
        <InputWithLabelComponent
          label="Quantity"
          PlaceHolder="Add product name"
          Input
          inputType="number"
        />
        <InputWithLabelComponent
          label="SKU(optional)"
          PlaceHolder="Add product name"
          Input
        />
      </div>
    </>
  );
};
