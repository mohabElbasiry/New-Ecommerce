import { memo } from "react";
import CollapseView from "./collapseView";
import { produce } from "immer";
import { VariationList } from "./createVariations/variationList";
import { UpdateAction } from "./RootFunction/middleWare";
import { CreateList } from "./createlist";

const ProductVariation = ({
  setVarients = () => {},
  productVarients = {},
  data = {
    Data: [],
    BeforeFilterData: [],
  },
  setData = () => {},
}) => {
  return (
    <>
      <p className="my-2 title">Add Varations</p>

      <div className="  p-2 bg-[#fff]  product-variant">
        <div className="w-[100%]    ">
          {productVarients?.variants?.length ? (
            <div className=" pb-1  rounded-md px-2 pt-1      mb-2">
              <VariationList
                productVarients={productVarients}
                setVarients={setVarients}
              />
              <CreateList setVarients={setVarients}>
                {" "}
                Add Another Varient{" "}
              </CreateList>
            </div>
          ) : null}
          {!productVarients?.variants?.length ? (
            <CreateList setVarients={setVarients}>
              Add Varient Like Colors & Size+{" "}
            </CreateList>
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
      </div>
    </>
  );
};
export default memo(ProductVariation);
