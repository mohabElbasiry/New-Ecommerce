import { InputWithLabelComponent } from "@/components/inputcomponent";
import { produce } from "immer";
import { useCallback, useEffect, useRef } from "react";

export default function Pricing({setSubmitedData,submitedData }) {
  const debounceRef = useRef(null);
  
  
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      handleCalcProfitMargin(submitedData?.Cost_Per_Item);
    }, 1200);

    return () => {
      clearTimeout(debounceRef.current);
    };
  }, [submitedData?.Cost_Per_Item, submitedData?.price]);

  const handleCalcProfitMargin = useCallback(
    (val) => {
      // calculate profit and margin

      let price = submitedData?.price;
      let Profit = +price - +val ;
      let Margin = +(+Profit / (+price||0)) * 100;

      setSubmitedData(
        produce((draft) => {
          draft.Profit = val ? Profit?.toFixed() : ``;
          draft.margin = val ? Margin?.toFixed() : ``;
        })
      );
    },
    [submitedData?.price, submitedData?.Cost_Per_Item]
  );



  return (
    <>      <h3 className="font-medium ">Pricing</h3>
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
                  value={submitedData?.price}
                  defaultValue={submitedData?.price}
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
                  value={submitedData?.compare_to_price}
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
  
                  defaultValue={submitedData?.Cost_Per_Item || 0}
                />
              </div>
              <div className="grid gap-2 min-w-52 w-[30%]">
                <h4 className="text-gray-500">Profit</h4>
                <input
                  className="w-full p-1.5 text-[#333] appearance-none px-3 focus:outline-none border rounded-md"
                  type="text"
                  disabled
                  
                  value={
                    submitedData?.Profit
                      ? `${submitedData?.Profit}`
                      : "00.00"
                  }
                  defaultValue={
                    submitedData?.Profit
                      ? `${submitedData?.Profit}`
                      : "00.00"
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
                    submitedData?.margin
                      ? `${submitedData?.margin} %`
                      : "00.00"
                  }
                  defaultValue={
                    submitedData?.margin
                      ? `${submitedData?.margin} %`
                      : "00.00"
                  }
                />
              </div>
            </div>
          </div>
        </div>
    
    </>
  );
}
