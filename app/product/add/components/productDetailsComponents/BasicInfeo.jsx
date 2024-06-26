import DraftEditor from "@/components/drafteditor/Draft";
import { InputWithLabelComponent } from "@/components/inputcomponent";

export const BasicData = () => {
  return (
    <>
      <InputWithLabelComponent
        Input
        label="product name"
        PlaceHolder="Add product name"
      />

      <DraftEditor
        field="Product Description"
        edit={false}
        handleChange={(value) => {}}
        handleBlur={() => {}}
      />
    </>
  );
};
