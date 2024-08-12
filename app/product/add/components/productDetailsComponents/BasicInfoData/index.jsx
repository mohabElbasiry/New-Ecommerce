 import Pricing from "./pricing";
import Seo from "./tags";
import ShippingInfo from "./ShippingInfo";
  import { memo  } from "react";
import { UpdateAction } from "../../productVariations/RootFunction/middleWare";
  import { Description } from "./description";
import  ProductTitle  from "./Title";
import { LanguageSelect } from "@/components/GlobalUi/languageSelect";
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
          <LanguageSelect>

      <ProductTitle errors={errors} register={register} setSubmitedData={setSubmitedData}
       title_ar={submitedData.title_ar} title_en={submitedData.title_en}/>
      <Description 
        description_ar={submitedData.description_ar} 
       description_en={submitedData.description_en}
         handleAction={handleAction} />
          </LanguageSelect>

        </div>
      </div>
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
