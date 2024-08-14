"use client";
import BasicData from "./BasicInfoData";
import ProductVariation from "../productVariations";
import { useMemo } from "react";
import { ProductSettings } from "./productSettings";
export const ProductDetailsComponent = ({
  submitedData,
  setSubmitedData,
  formData,
  data,
  setData,
}) => {
  return (
    <div className="justify-end gap-1 p-3 ml-auto ">
      <div className="flex gap-3  ml-auto  ">
        <div className="container  m-1  w-[50%] overflow-auto flex flex-col gap-3 ">
          <BasicData
            submitedData={submitedData?.productDetails}
            pricingData={submitedData?.pricing}
            shippingData={submitedData?.shipping}
            seoData={submitedData?.seo}
            images={submitedData?.productDetails?.images}
            inventory={submitedData?.Stock}
            formData={useMemo(() => formData, [submitedData?.productDetails])}
            setSubmitedData={setSubmitedData}
          >
            <ProductVariation
              productVarients={submitedData?.productvaritions}
              setVarients={setSubmitedData}
              data={data}
              setData={setData}
              refrenceVarient={
                submitedData?.productvaritions?.referencevarients
              }
            />
          </BasicData>
        </div>
        <div className="w-fit">
          <div className="w-[100%]   p-2 flex flex-col gap-3 ">
            <ProductSettings
              settings={submitedData?.settings}
              setSubmitedData={setSubmitedData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
