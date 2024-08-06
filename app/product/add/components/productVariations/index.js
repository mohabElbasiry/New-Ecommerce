import { memo } from "react";
import CollapseView from "./collapseView";
import { produce } from "immer";
import { VariationList } from "./createVariations/variationList";
const ProductVariation = ({
  setVarients = () => {},
  productVarients = {},
  refrenceVarient = [],
  data = {
    Data: [],
    BeforeFilterData: [],
  },
  setHistory,
  setData = () => {},
}) => {
  return (
    <>
      <p className="my-2 title">Add Varations</p>

      <div className="  p-2 bg-[#fff]  product-variant">
        <div className="w-[100%]    ">
          {productVarients?.variants?.length ? (
            <div className=" pb-1  rounded-md px-2 pt-1   border  mb-2">
              <VariationList
                productVarients={productVarients}
                setVarients={setVarients}
              />
              <p
                className="cursor-pointer text-sm lowercase border-t p-2 px-2"
                onClick={() => {
                  setVarients(
                    produce((draft) => {
                      draft?.productvaritions?.variants?.push({
                        isColor: "",
                        key_en: "",
                        key_ar: "",
                        values: [
                          {
                            value_ar: "",
                            value_en: "",
                            color: "",
                          },
                        ],
                        edit: true,
                      });
                      const { history, ...others } = draft;
                      draft.history.push(others);
                    })
                  );
                }}
              >
                {" "}
                Add Another Varient +
              </p>
            </div>
          ) : null}
          {!productVarients?.variants?.length ? (
            <p
              className="cursor-pointer add-product-variant text-sm lowercase p-3 rounded-lg shadow bg-[#fff]"
              onClick={() => {
                setVarients(
                  produce((draft) => {
                    draft?.productvaritions?.variants?.push({
                      isColor: "",

                      key_en: "",
                      key_ar: "",

                      values: [
                        {
                          value_ar: "",
                          value_en: "",
                          color: "",
                        },
                      ],
                      edit: true,
                    });
                    const { history, ...others } = draft;
                    draft.history.push(others);
                  })
                );
              }}
            >
              {" "}
              Add Varient Like Colors & Size+
            </p>
          ) : null}
        </div>
        {productVarients?.variants?.filter((item) => !item?.edit)?.length ? (
          <CollapseView
            varitions={productVarients?.variants?.filter((item) => !item?.edit)}
            varitionsValues={productVarients?.varitionsValues}
            setVarients={setVarients}
            setData={setData}
            data={data}
            REfvariants={productVarients?.REfvariants}
          />
        ) : null}

        {/* <VariationTable varitions={productVarients?.variants} 
      // setSubmitedData={setSubmitedData}
       /> */}
      </div>
    </>
  );
};
export default memo(ProductVariation);
