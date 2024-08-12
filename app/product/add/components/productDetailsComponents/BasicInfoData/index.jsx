import { InputWithLabelComponent } from "@/components/inputcomponent";
import Pricing from "../pricing";
import Seo from "../tags";
import ShippingInfo from "../ShippingInfo";
import TextEditor from "@/components/TextEditor";
import { produce } from "immer";
import { memo, useCallback, useEffect } from "react";
import { UpdateAction } from "../../productVariations/RootFunction/middleWare";
import { debounce } from "lodash";
import { DebounceHook } from "../../hooks/DebounceHook";
import { Description } from "./description";
const BasicData = ({
  submitedData = {},
  formData = {},
  setSubmitedData = () => {},
  pricingData = {},
  shippingData = {},
  seoData = {},
}) => {
  const handleAction = (action) => {
    UpdateAction(action, setSubmitedData);
  };
  const { useDebounceForUpdate } = DebounceHook({ handleAction });
  const UdateBasicInfo = (ev) => {
    const { value } = ev.target;
    handleAction({
      type: "UpdatePropertyByNameAndValue",
      payload: { name: "title_en", value },
      target: "productDetails",
    });
    useDebounceForUpdate(value);
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
            PlaceHolder="Add product name"
            register={{ ...register("title_en") }}
            isError={errors?.title_en}
            message={errors?.title_en?.message}
            value={submitedData?.title_en}
            onChange={(e) => {
              UdateBasicInfo(e);
            }}
          />
          
   <Description 
  description_ar={submitedData.description_ar} 
  description_en={submitedData.description_en}
  handleAction={handleAction}
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
