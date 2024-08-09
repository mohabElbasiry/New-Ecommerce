import { useCallback, useEffect, useRef } from "react";
import { UpdateAction } from "../productVariations/RootFunction/middleWare";
import { DebounceHook } from "../hooks/DebounceHook";

export default function Pricing({ setSubmitedData, pricingData }) {
  const handleAction = (action) => {
    UpdateAction(action, setSubmitedData);
  };
  const debounceRef = useRef(null);
  const { useDebounceForUpdate } = DebounceHook({ handleAction });

  useEffect(() => {
    if (pricingData.Cost_Per_Item && pricingData.price) {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      debounceRef.current = setTimeout(() => {
        handleCalcProfitMargin(pricingData?.Cost_Per_Item);
      }, 1200);

      return () => {
        clearTimeout(debounceRef.current);
      };
    }
  }, [pricingData.Cost_Per_Item, pricingData.price]);

  const handleCalcProfitMargin = useCallback(
    (val) => {
      let price = pricingData.price;
      let profit = +pricingData.price - +val;
      let Margin = +(+profit / (+price || 0)) * 100;
      const action = {
        type: "UpdatePropertyByNameAndValue",
        payload: [
          { name: "profit", value: val ? profit?.toFixed() : `` },
          { name: "margin", value: val ? Margin?.toFixed() : `` },
        ],
        target: "pricing",
      };
      handleAction(action);
    },
    [pricingData.price, pricingData.Cost_Per_Item]
  );
  const handleChange = (event) => {
    const { name, value } = event.target;
    const action = {
      type: "UpdatePropertyByNameAndValue",
      payload: { name, value },
      target: "pricing",
    };
    UpdateAction(action, setSubmitedData);
    useDebounceForUpdate(value)
  };

  return (
    <>
      {" "}
      <h3 className="font-medium ">Pricing</h3>
      <div className=" bg-white rounded-lg border-[0.5px] shadow p-5">
        <div className="flex gap-8 mt-5  flex-col">
          <div className="flex gap-5  flex-wrap">
            <div className="grid gap-2 min-w-52 w-[30%]">
              <h4 className="text-gray-500">Price</h4>
              <input
                className="w-full p-1.5 text-[#333] appearance-none px-3 focus:outline-none border rounded-md"
                type="text"
                name="price"
                onChange={(e) => handleChange(e)}
                value={pricingData.price}
                defaultValue={pricingData.price}
              />
            </div>
            <div className="grid gap-2 min-w-52 w-[30%]">
              <h4 className="text-gray-500">Compare-at price</h4>
              <input
                className="w-full p-1.5 text-[#333] appearance-none px-3 focus:outline-none border rounded-md"
                type="text"
                name="compare_to_price"
                onChange={(e) => handleChange(e)}
                value={pricingData.compare_to_price}
                defaultValue={pricingData.compare_to_price}
              />
            </div>
          </div>
          <div className="flex gap-5  flex-wrap">
            <div className="grid gap-2 min-w-52 w-[30%]">
              <h4 className="text-gray-500">Cost per item</h4>
              <input
                className="w-full p-1.5 text-[#333] appearance-none px-3 focus:outline-none border rounded-md"
                type="text"
                value={pricingData?.Cost_Per_Item}
                name="Cost_Per_Item"
                onChange={(e) => handleChange(e)}
                defaultValue={pricingData?.Cost_Per_Item || 0}
              />
            </div>
            <div className="grid gap-2 min-w-52 w-[30%]">
              <h4 className="text-gray-500">profit</h4>
              <input
                className="w-full p-1.5 text-[#333] appearance-none px-3 focus:outline-none border rounded-md"
                type="text"
                disabled
                value={pricingData.profit ? `${pricingData?.profit}` : "00.00"}
                defaultValue={
                  pricingData.profit ? `${pricingData?.profit}` : "00.00"
                }
              />
            </div>
            <div className="grid gap-2 min-w-52 w-[30%]">
              <h4 className="text-gray-500">Margin</h4>
              <input
                className="w-full p-1.5 text-[#333] appearance-none px-3 focus:outline-none border rounded-md"
                type="text"
                disabled
                value={
                  pricingData.margin ? `${pricingData?.margin} %` : "00.00"
                }
                defaultValue={
                  pricingData.margin ? `${pricingData?.margin} %` : "00.00"
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
