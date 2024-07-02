import { InputWithLabelComponent } from "@/components/inputcomponent";

export default function SubCategoriesSelect({ register }) {
  return (
    <div className=" grid grid-cols-3 gap-2">
      <InputWithLabelComponent
        Input={false}
        selectArray={["hello", "dummy"]}
        label="Parent Category "
        PlaceHolder="Add product name"
        inputCss="w-[100%]"
        register={{ ...register("category") }}
      />
      {/* <hr className="w-[100px]  bg-black" /> */}

      <InputWithLabelComponent
        Input={false}
        selectArray={["hello", "dummy"]}
        label="Category"
        PlaceHolder="Add product name"
        inputCss="w-[100%]"
      />

      {/* <hr className="w-[100px]  bg-black" /> */}
      <InputWithLabelComponent
        Input={false}
        selectArray={["hello", "dummy"]}
        label="Sub Category"
        PlaceHolder="Add product name"
        inputCss="w-[100%]"
      />
    </div>
  );
}
