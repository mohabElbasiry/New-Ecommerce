import { InputWithLabelComponent } from "@/components/inputcomponent";

export default function Pricing({ register }) {
  return (
    <>
      {" "}
      <p className="font-semibold">Pricing</p>
      <div className="grid grid-cols-3 gap-2">
        <InputWithLabelComponent
          label="price"
          PlaceHolder="Add product price"
          Input
          inputType="number"
          register={{ ...register("price") }}
          price
        />
        <InputWithLabelComponent
          label="compare To Price"
          PlaceHolder="Add product price"
          Input
          inputType="number"
          register={{ ...register("price") }}
          price
        />
      


      </div>

      <div className="grid grid-cols-3 gap-5">
      <InputWithLabelComponent
          label="Cost Per Item"
          PlaceHolder="Cost Per Item"
          Input
          inputType="number"
          register={{ ...register("CosTPeRItem") }}
          price
        />
      <InputWithLabelComponent
          label="margin"
          PlaceHolder="Margin"
          Input
          inputCss="bg-[#fff] text-white border-none  "
        />
        <InputWithLabelComponent
          label="profit"
          PlaceHolder="profit"
          Input
          inputCss="bg-[#fff] text-white border-none  "
        />
      </div>
    </>
  );
}
