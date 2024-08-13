 import Pricing from "./pricing";
import Seo from "./tags";
import ShippingInfo from "./ShippingInfo";
  import { memo  } from "react";
import { UpdateAction } from "../../productVariations/RootFunction/middleWare";
  import { Description } from "./description";
import  ProductTitle  from "./Title";
import { LanguageSelect } from "@/components/GlobalUi/languageSelect";
import ProductImages from "../../productImages";
import  Inventory  from "./Inventory";
const BasicData = ({
  submitedData = {},
  formData = {},
  setSubmitedData = () => {},
  pricingData = {},
  shippingData = {},
  seoData = {},
  images=[],
  inventory,children,
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
      <div className="box p-3 mb-3">
      <div className="  p-2">
        
        <div className="flex flex-col gap-2 w-full">
          <LanguageSelect>

      <ProductTitle errors={errors} register={register} setSubmitedData={setSubmitedData}
       title_ar={submitedData.title_ar} title_en={submitedData.title_en}/>
      <Description 
        description_ar={submitedData.description_ar} 
       description_en={submitedData.description_en}
         handleAction={handleAction} />
          </LanguageSelect>

      <ProductImages
              setSubmitedData={setSubmitedData}
              images={ images}
            />
      </div>
        </div>
      </div>
      <Inventory  
      inventory={inventory}
      setSubmitedData={setSubmitedData}/>
      <Pricing pricingData={pricingData} setSubmitedData={setSubmitedData} />
      <ShippingInfo
        setSubmitedData={setSubmitedData}
        shippingData={shippingData}
      />
  {
    children
  }

      <Seo seoData={seoData} setSubmitedData={setSubmitedData} />
    
    </div>
  );
};

export default memo(BasicData);
