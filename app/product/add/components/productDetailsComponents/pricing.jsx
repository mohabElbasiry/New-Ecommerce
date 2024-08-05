import { InputWithLabelComponent } from "@/components/inputcomponent";
import { produce } from "immer";
import { useCallback, useEffect, useRef } from "react";

export default function Pricing({
  setSubmitedData,
  price,
  compare_to_price,
  profit,
  margin,
  Cost_Per_Item,
}) {
  const debounceRef = useRef(null);

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      handleCalcProfitMargin(Cost_Per_Item);
    }, 1200);

    return () => {
      clearTimeout(debounceRef.current);
    };
  }, [Cost_Per_Item, price]);

  const handleCalcProfitMargin = useCallback(
    (val) => {
      // calculate profit and margin

      let price =0;
      let profit = +price - +val;
      let Margin = +(+profit / (+price || 0)) * 100;

      setSubmitedData(
        produce((draft) => {
          draft.profit = val ? profit?.toFixed() : ``;
          draft.margin = val ? Margin?.toFixed() : ``;
        })
      );
    },
    [price, Cost_Per_Item]
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
                      draft.price = e.target.value;
                    })
                  )
                }
                value={price}
                defaultValue={price}
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
                      draft.compare_to_price = e.target.value;
                    })
                  )
                }
                value={compare_to_price}
                defaultValue={"00.00"}
              />
            </div>
          </div>
          <div className="flex gap-5  flex-wrap">
            <div className="grid gap-2 min-w-52 w-[30%]">
              <h4 className="text-gray-500">Cost per item</h4>
              <input
                className="w-full p-1.5 text-[#333] appearance-none px-3 focus:outline-none border rounded-md"
                type="text"
                onChange={(e) =>
                  setSubmitedData(
                    produce((draft) => {
                      draft.Cost_Per_Item = e.target.value;
                    })
                  )
                }
                defaultValue={Cost_Per_Item || 0}
              />
            </div>
            <div className="grid gap-2 min-w-52 w-[30%]">
              <h4 className="text-gray-500">profit</h4>
              <input
                className="w-full p-1.5 text-[#333] appearance-none px-3 focus:outline-none border rounded-md"
                type="text"
                disabled
                value={
                  profit ? `${profit}` : "00.00"
                }
                defaultValue={
                  profit ? `${profit}` : "00.00"
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
                  margin ? `${margin} %` : "00.00"
                }
                defaultValue={
                 margin ? `${margin} %` : "00.00"
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
