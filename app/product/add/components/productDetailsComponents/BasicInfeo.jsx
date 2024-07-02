import DraftEditor from "@/components/drafteditor/Draft";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { InputWithLabelComponent } from "@/components/inputcomponent";
import SubCategoriesSelect from "./categoriesWithSub";
import { Inventory } from "./inventory";
import Pricing from "./pricing";
import { BasicFormValidation } from "./BasicFormValidationSchema";

export const BasicData = ({ submitedData = {} }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(BasicFormValidation("en")),
  });
  const onSubmit = (data) => {
    console.log("objectdata", data);
  };
  console.log(errors,'errors');
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputWithLabelComponent
        Input
        label="product name in English"
        PlaceHolder="Add product name in English"
        register={{ ...register("title_en") }}
      />
      <InputWithLabelComponent
        Input
        label="product name in Arabic"
        PlaceHolder="Add product name in Arabic"
        register={{ ...register("title_ar") }}
        setValue={setValue}
        property={"description_en"}
      />
      <DraftEditor
        field="Product Description in English"
        edit={false}
        register={{ ...register("description_en") }}
        setValue={setValue}
        property={"description_en"}
      />
      <DraftEditor
        field="Product Description in Arabic"
        edit={false}
        setValue={setValue}
        property={"description_ar"}
      />
      <SubCategoriesSelect submitedData={submitedData} register={register} />{" "}
      <Inventory submitedData={submitedData} register={register} />{" "}
      <Pricing submitedData={submitedData} register={register} />
      <button type="submit">Save</button>
    </form>
  );
};
