import DraftEditor from "@/components/drafteditor/Draft";
import { InputWithLabelComponent } from "@/components/inputcomponent";
import SubCategoriesSelect from "./categoriesWithSub";
import { Inventory } from "./inventory";
import Pricing from "./pricing";

export const BasicData = ({ submitedData = {}, formData = {} }) => {
  const { errors, register, reset, setValue } = formData;

  return (
    <div
      className="gap-5
    bg-white shadow-md rounded-lg p-3
    flex flex-col"
    >
      <InputWithLabelComponent
        Input
        label="product name in English"
        PlaceHolder="Add product name in English"
        register={{ ...register("title_en") }}
        isError={errors?.title_en}
        message={errors?.title_en?.message}
      />
      <InputWithLabelComponent
        Input
        label="product name in Arabic"
        PlaceHolder="Add product name in Arabic"
        register={{ ...register("title_ar") }}
        setValue={setValue}
        property={"description_en"}
        isError={errors?.title_ar}
        message={errors?.title_ar?.message}
      />
      <DraftEditor
        field="Product Description in English"
        edit={false}
        register={{ ...register("description_en") }}
        setValue={setValue}
        property={"description_en"}
        error={errors?.description_en}
        message={errors?.description_en?.message}
      />
      <DraftEditor
        field="Product Description in Arabic"
        edit={false}
        setValue={setValue}
        property={"description_ar"}
        error={errors?.description_ar}
        message={errors?.description_ar?.message}
      />
      <SubCategoriesSelect
        submitedData={submitedData}
        register={register}
        error={errors}
      />{" "}
      <Inventory submitedData={submitedData} register={register} />{" "}
      <Pricing submitedData={submitedData} register={register} />
    </div>
  );
};
