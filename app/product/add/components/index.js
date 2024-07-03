"use client";
import { useEffect, useState } from "react";
import Headercomponent from "./headercomponent";
import { ProductDetailsComponent } from "./productDetailsComponents";

export const ProductAddMaim = () => {
  const [submitedData, setSubmitedData] = useState({
    productvaritions: {
      variants: [],
      VarientValues: [],
    },
    productDetails: {
      title_ar: "",
      title_en: "",
      description_ar: "",
      description_en: "",
      Stock: { repositry: {}, quantity: "", sku: "" },
      price: { mainPrice: "", costPerItem: "", DiscountPrice: "" },
    },
    seo: { tags: [], title: "", description: "" },
    setSubmitedData: () => {},
    submitedData: {},
  });
  useEffect(() => {
    const SubmitedData = localStorage.getItem("submitedItem");
    if (submitedData) {
      const ParsingData = JSON.parse(SubmitedData);
      if (ParsingData?.SubmitedValues?.length) {
        console.log(ParsingData, "ParsingData");
        setSubmitedData(ParsingData?.SubmitedValues);
      }
    }
  }, []);
  return (
    <>
      <Headercomponent />
      <div className="flex items-end justify-end   gap-2">
        <ProductDetailsComponent
          submitedData={submitedData}
          setSubmitedData={setSubmitedData}
        />
      </div>
    </>
  );
};
