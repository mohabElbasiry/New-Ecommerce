import { InputTimePPicker } from "@/components/GlobalUi/inputTimePicker/inputDateTimePicker";
import { InputWithLabelComponent } from "@/components/inputcomponent";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { produce } from "immer";
import { UpdateAction } from "../productVariations/RootFunction/middleWare";
export const ProductSettings = ({ setSubmitedData }) => {
  const handleAction = (action) => {
    UpdateAction(action, setSubmitedData);
  };
  const updateData = (event) => {
    const { name, value } = event.target;
    handleAction({
      type: "UpdatePropertyByNameAndValue",
      payload: { name, value },
    });
  };
  return (
    <>
      <div className=" gap-3   flex items-end justify-between  mb-4 ">
        {/* <InputWithLabelComponent
          Input={false}
          label="product status"
          selectArray={["publish", "draft"]}
          PlaceHolder="Add product name"
          inputCss=" text-enter    text-sm   flex border !p-1  items-center"
          labelcss="title"
        /> */}
        <RadioGroup
          name="status"
          onChange={(event) => updateData(event)}
          defaultValue=""
        >
          <label htmlFor="">Check Status</label>
          {["publish", "draft"].map((item) => (
            <div key={item} className="flex items-center space-x-2">
              <RadioGroupItem value={item} id={item} />
              <Label className="cursor-pointer" htmlFor={item}>
                {item}
              </Label>
            </div>
          ))}
        </RadioGroup>
        <InputTimePPicker
          name="publishTime"
          onChange={(event) => updateData(event)}
          setSubmitedData={setSubmitedData}
        />
      </div>
    </>
  );
};
