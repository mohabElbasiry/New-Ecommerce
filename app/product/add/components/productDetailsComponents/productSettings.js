 import { InputTimePPicker } from "@/components/GlobalUi/inputTimePicker/inputDateTimePicker";
import { InputWithLabelComponent } from "@/components/inputcomponent";
 
export const ProductSettings = () => {

  return (
    <>
       <div className=" gap-3    mb-4">
       <InputWithLabelComponent
        Input={false}
        label="product status"
        selectArray={["publish","draft"]}
         PlaceHolder="Add product name"
        inputCss=" !w-fit    text-sm  flex border-none items-center"
 
      />
     <InputTimePPicker/>
      </div>
      
    </>
  );
};
