import { InputWithLabelComponent } from "@/components/inputcomponent";
import { UpdateAction } from "../../../productVariations/RootFunction/middleWare";
import { DebounceHook } from "../../../hooks/DebounceHook";
import { memo, useCallback } from "react";

const ProductTitle = ({
  title_en,
  title_ar,
  setSubmitedData,
  register,
  errors,
  lang,
}) => {
  console.log("object");
  const handleAction = useCallback((action) => {
    UpdateAction(action, setSubmitedData);
  }, []);
  const { useDebounceForUpdate } = DebounceHook({ handleAction });
  const UdateBasicInfo = (e) => {
    const { value, name } = e.target;
    handleAction({
      type: "UpdatePropertyByNameAndValue",
      payload: { name: "title_en", value },
      target: "productDetails",
    });
    useDebounceForUpdate(value);
  };

  return (
    <>
      {lang === "en" ? (
        <InputWithLabelComponent
          Input
          // label="product name In English"
          PlaceHolder="Add product name"
          register={{ ...register("title_en") }}
          isError={errors?.title_en}
          message={errors?.title_en?.message}
          value={title_en}
          onChange={(e) => {
            UdateBasicInfo(e);
          }}
        />
      ) : null}
      {lang === "ar" ? (
        <InputWithLabelComponent
          Input
          // label="product name In Arabic"
          PlaceHolder="Add product name"
          register={{ ...register("title_ar") }}
          isError={errors?.title_ar}
          message={errors?.title_ar?.message}
          value={title_ar}
          onChange={(e) => {
            UdateBasicInfo(e);
          }}
        />
      ) : null}
    </>
  );
};

export default memo(ProductTitle);
