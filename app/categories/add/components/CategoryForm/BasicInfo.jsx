import { InputWithLabelComponent } from "@/components/inputcomponent";
import TextEditor from "@/components/TextEditor";
import { produce } from "immer";
import React, { memo } from "react";

function BasicInfo({ formData, setFormData }) {
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(
      produce((draft) => {
        draft[name] = value;
      })
    );
  };
  return (
    <div className=" bg-white p-8 col-span-2 rounded-2xl">
      <InputWithLabelComponent
        Input
        label="english name"
        PlaceHolder="english name"
        name="name_en"
        value={formData.name_en}
        onChange={(event) => handleChange(event)}
      />
      <InputWithLabelComponent
        Input
        label="arabic name"
        PlaceHolder="arabic name"
        name="name_ar"
        value={formData.name_ar}
        onChange={(event) => handleChange(event)}
      />
      <div className="mt-5">
        <TextEditor
          content={formData.description_en}
          name="description_en"
          setSubmitedData={setFormData}
        />
        <div className=" mt-10">
          <TextEditor
            content={formData.description_ar}
            name="description_ar"
            setSubmitedData={setFormData}
          />
        </div>
      </div>
    </div>
  );
}
export default memo(BasicInfo);
