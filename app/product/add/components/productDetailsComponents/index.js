"use client";
import BasicData from "./BasicInfeo";
import ProductVariation from "../productVariations";
import { ProductSettings } from "./productSettings";
import ProductImages from "../productImages";
import { memoize } from "lodash";
import { useCallback, useMemo } from "react";

export const ProductDetailsComponent = ({
  submitedData,
  setSubmitedData,
  formData,
  data,
  setData,
}) => {
  return (
    <div className="justify-end gap-1 p-3 ml-auto ">
      <div className="flex gap-3 mt-3 ml-auto  ">
        <div className="container p-3 m-1  w-[50%] overflow-auto flex f+lex-col gap-3 ">
          <BasicData
            submitedData={submitedData?.productDetails}
            pricingData={submitedData?.pricing}
            shippingData={submitedData?.shipping}
            seoData={submitedData?.seo}
            formData={useMemo(() => formData, [submitedData?.productDetails])}
            setSubmitedData={setSubmitedData}
          />
        </div>

        <div className="w-[50%] ">
          <div className="w-[100%]   p-2 flex flex-col gap-3 ">
            <ProductSettings
              settingsData={{
                status: submitedData?.status,
                publishTime: submitedData?.publishTime,
              }}
              setSubmitedData={setSubmitedData}
            />
            <ProductImages
              setSubmitedData={setSubmitedData}
              images={submitedData?.productDetails?.images}
            />
          </div>
          <div className="w-full overflow-auto ">
            <ProductVariation
              productVarients={submitedData?.productvaritions}
              setVarients={setSubmitedData}
              data={data}
              setData={setData}
              refrenceVarient={
                submitedData?.productvaritions?.referencevarients
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};
