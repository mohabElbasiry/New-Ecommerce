import DraftEditor from "@/components/drafteditor/Draft";
import { InputWithLabelComponent } from "@/components/inputcomponent";
import SubCategoriesSelect from "./categoriesWithSub";
import { Inventory } from "./inventory";
import Pricing from "./pricing";

export const BasicData = ({
  submitedData = {},
  formData = {},
  setSubmitedData = {},
}) => {
  const UdateBasicInfo = (e, setSubmitedData) => {
    setSubmitedData((prev) => ({
      ...prev,
      productDetails: {
        ...prev.productDetails,
        [e.target.name]: e.target.value,
      },
    }));
  };
  console.log(submitedData,'submitedDatasubmitedDatasubmitedData');
  const {
    errors,
    register,
    reset,
    setValue,
    getValues,
    setError,
    clearErrors,
    isSubmitting
  } = formData;
  return (
    <div
      className="gap-5
      rounded-lg p-3
    flex flex-col w-full"
    >
     <div className="flex flex-col gap-2 w-full">
     <InputWithLabelComponent
        Input
        label="product name "
        PlaceHolder="Add product name "
        register={{ ...register("title_en") }}
        isError={errors?.title_en}
        message={errors?.title_en?.message}
        value={submitedData?.productDetails?.title_en}
        onChange={(e) => {
          UdateBasicInfo(e, setSubmitedData);
        }}
       />
      {/* <InputWithLabelComponent
        Input
        label="product name in Arabic"
        PlaceHolder="Add product name in Arabic"
        register={{ ...register("title_ar") }}
        setValue={setValue}
        property={"description_en"}
        isError={errors?.title_ar}
        message={errors?.title_ar?.message}
        value={submitedData?.productDetails?.title_ar}
        onChange={(e) => {
          UdateBasicInfo(e, setSubmitedData);
        }}
      /> */}
     </div>
     
      <DraftEditor
        field="Product Description "
        edit={false}
        register={{ ...register("description_en") }}
        setValue={setValue}
        property={"description_en"}
        error={errors?.description_en}
        message={errors?.description_en?.message}
        setError={setError}
        clearErrors={clearErrors}
        value={submitedData?.productDetails?.description_en}
        onChange={UdateBasicInfo}
        setSubmitedData={setSubmitedData}
        isSubmitted={isSubmitting}
      />
      {/* <DraftEditor
        field="Product Description in Arabic"
        edit={false}
        setValue={setValue}
        register={{ ...register("description_ar") }}
        property={"description_ar"}
        error={errors?.description_ar}
        message={errors?.description_ar?.message}
        setError={setError}
        clearErrors={clearErrors}
        value={submitedData?.productDetails?.description_ar}
        onChange={UdateBasicInfo}
        setSubmitedData={setSubmitedData}
        isSubmitted={isSubmitting}
      /> */}
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
