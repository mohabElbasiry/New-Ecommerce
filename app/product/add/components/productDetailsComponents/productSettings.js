 import { InputTimePPicker } from "@/components/GlobalUi/inputTimePicker/inputDateTimePicker";
import { InputWithLabelComponent } from "@/components/inputcomponent";
 
export const ProductSettings = () => {

  return (
    <>
       <div className=" gap-3 w-fit mb-4">
       <InputWithLabelComponent
        Input={false}
        selectArray={["hello", "dummy"]}
         PlaceHolder="Add product name"
        inputCss="  "
        label="statues"

      />
     <InputTimePPicker/>
      </div>
      
    </>
  );
};
