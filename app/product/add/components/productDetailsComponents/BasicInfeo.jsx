import { InputWithLabelComponent } from "@/components/inputcomponent";
import Pricing from "./pricing";
import Seo from "./tags";
import ShippingInfo from "./ShippingInfo";
import TextEditor from "@/components/TextEditor";
import { produce } from "immer";
import { memo } from "react";
import { isEqual } from "lodash";
const BasicData = ({
  submitedData = {},
  formData = {},
  setSubmitedData = () => {},
  pricingData = {},
  shippingData = {},
  seoData = {},
}) => {
  function debounce(func, wait = 2000) {
    let timeout;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(context, args);
        // Using apply here
      }, wait);
    };
  }

  const UdateBasicInfo = (e, setSubmittedData) => {
    const { value, name } = e.target;
    setSubmittedData(
      produce((draft) => {
        draft.productDetails[name] = value;
      })
    );
    debounce(() =>
      setSubmittedData(
        produce((draft) => {
          const { history, ...other } = draft;
          draft.history.push(other);
        })
      )
    ); // Call the debounced function immediately to handle initial update
  };

  const updateDetails = (e) => {
    setSubmitedData(
      produce((prev) => {
        prev.description = e;
        const { history, ...other } = prev;
        prev.history.push(other);
      })
    );
  };
  const { errors = {}, register = {} } = formData;

  return (
    <div className="gap-5  rounded-lg  flex-col w-full">
      <p className="title">Product Description</p>
      <div className="box p-2">
        <div className="flex flex-col gap-2 w-full">
          <InputWithLabelComponent
            Input
            label="product name "
            PlaceHolder="Add product name "
            register={{ ...register("title_en") }}
            isError={errors?.title_en}
            message={errors?.title_en?.message}
            value={submitedData?.title_en}
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

        <h3>Product Description</h3>
        <TextEditor
          content={submitedData?.description_en}
          setContent={updateDetails}
          setSubmitedData={setSubmitedData}
        />
      </div>
      {/* <Inventory
        errors={errors}
        submitedData={submitedData}
        register={register}
      />{" "} */}
      <Pricing pricingData={pricingData} setSubmitedData={setSubmitedData} />
      <ShippingInfo
        setSubmitedData={setSubmitedData}
        shippingData={shippingData}
      />
      <Seo seoData={seoData} setSubmitedData={setSubmitedData} />
    </div>
  );
};

export default memo(BasicData);
