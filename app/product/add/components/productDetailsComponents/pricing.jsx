import { InputWithLabelComponent } from "@/components/inputcomponent";

export default function  Pricing() {
  return (
    <>
      {" "}
      <p className="font-semibold">Pricing</p>
      <div className="grid grid-cols-4 gap-2">
        <InputWithLabelComponent
          label="price"
          PlaceHolder="Add product name"
          Input
          inputType="number"
        />
        <InputWithLabelComponent
          label="Cost Per Item"
          PlaceHolder="Cost Per Item"
          Input
          inputType="number"
        />
        <InputWithLabelComponent
          label="Discount Price"
          PlaceHolder="Add product name"
          Input
        />
        <InputWithLabelComponent
          label="margin"
          PlaceHolder="Margin"
          Input
          inputCss="bg-[#fff] text-white border-none  "
        />
      </div>
    </>
  );
}
