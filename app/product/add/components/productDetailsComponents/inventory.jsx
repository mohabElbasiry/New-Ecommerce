import { InputWithLabelComponent } from "@/components/inputcomponent";

export const Inventory = ({ register }) => {
  return (
    <>
      <p className="font-semibold">Inventory</p>

      <div className="grid grid-cols-2 gap-2">
        <InputWithLabelComponent
          label="Quantity"
          PlaceHolder="Add product Quantity"
          Input
          inputType="number"
          register={{ ...register("Quantity") }}
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
