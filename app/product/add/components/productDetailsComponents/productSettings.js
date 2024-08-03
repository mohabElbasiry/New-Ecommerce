import { InputTimePPicker } from "@/components/GlobalUi/inputTimePicker/inputDateTimePicker";
import { InputWithLabelComponent } from "@/components/inputcomponent";

export const ProductSettings = () => {
  return (
    <>
      <div className=" gap-3   flex items-end justify-between  mb-4 ">
        <InputWithLabelComponent
          Input={false}
          label="product status"
          selectArray={["publish", "draft"]}
          PlaceHolder="Add product name"
          inputCss=" text-enter    text-sm   flex border !p-1  items-center"
          labelcss="title"
        />
        <InputTimePPicker />
      </div>
    </>
  );
};
