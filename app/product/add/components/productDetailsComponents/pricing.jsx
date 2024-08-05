import { InputWithLabelComponent } from "@/components/inputcomponent";
import { produce } from "immer";
import { useCallback, useEffect, useRef } from "react";

export default function Pricing({ setSubmitedData, pricingData }) {
  const debounceRef = useRef(null);
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      handleCalcProfitMargin(pricingData?.Cost_Per_Item);
    }, 1200);

    return () => {
      clearTimeout(debounceRef.current);
    };
  }, [pricingData.Cost_Per_Item, pricingData.price]);

  const handleCalcProfitMargin = useCallback(
    (val) => {
      // calculate profit and margin

      let price = pricingData.price;
      let profit = +pricingData.price - +val;
      let Margin = +(+profit / (+price || 0)) * 100;

      setSubmitedData(
        produce((draft) => {
          draft.pricing.profit = val ? profit?.toFixed() : ``;
          draft.pricing.margin = val ? Margin?.toFixed() : ``;
        })
      );
    },
    [pricingData.price, pricingData.Cost_Per_Item]
  );

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
                onChange={(e) =>
                  setSubmitedData(
                    produce((draft) => {
                      draft.pricing.price = e.target.value;
                    })
                  )
                }
                value={pricingData.price}
                defaultValue={pricingData.price}
              />
            </div>
            <div className="grid gap-2 min-w-52 w-[30%]">
              <h4 className="text-gray-500">Compare-at price</h4>
              <input
                className="w-full p-1.5 text-[#333] appearance-none px-3 focus:outline-none border rounded-md"
                type="text"
                onChange={(e) =>
                  setSubmitedData(
                    produce((draft) => {
                      draft.pricing.compare_to_price = e.target.value;
                    })
                  )
                }
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
                onChange={(e) =>
                  setSubmitedData(
                    produce((draft) => {
                      draft.pricing.Cost_Per_Item = e.target.value;
                    })
                  )
                }
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
