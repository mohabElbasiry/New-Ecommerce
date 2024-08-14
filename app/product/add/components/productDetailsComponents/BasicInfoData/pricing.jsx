import { memo, useCallback, useEffect, useRef } from "react";
import { UpdateAction } from "../../productVariations/RootFunction/middleWare";
import { DebounceHook } from "../../hooks/DebounceHook";
import { InputWithLabelComponent } from "@/components/inputcomponent";

 function Pricing({ setSubmitedData, pricingData }) {
  console.log('object');
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
      }, 100);

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
      <div className=" bg-white rounded-lg border-[0.5px] shadow p-2 mt-2">
        <div className="flex gap-8    flex-col">
          <div className="flex gap-5  flex-wrap">
            <div className="grid gap-2 min-w-52 w-[30%]">
               <InputWithLabelComponent
              
                label="Price"
                type="text"
                name="price"
                onChange={(e) => handleChange(e)}
                value={pricingData.price}
                defaultValue={pricingData.price}
                Input
              />
            </div>
            <div className="grid gap-2 min-w-52 w-[30%]">
               <InputWithLabelComponent
              label="Compare-at price"
                  
                type="text"
                name="compare_to_price"
                onChange={(e) => handleChange(e)}
                value={pricingData.compare_to_price}
                defaultValue={pricingData.compare_to_price}
                Input
              />
            </div>
          </div>
          <div className="flex gap-5  flex-wrap">
            <div className="grid gap-2 min-w-52 w-[30%]">
               <InputWithLabelComponent
               
                type="text"
                label="Cost per item"
                Input
                value={pricingData?.Cost_Per_Item}
                name="Cost_Per_Item"
                onChange={(e) => handleChange(e)}
                defaultValue={pricingData?.Cost_Per_Item || 0}
              />
            </div>
            <div className="grid gap-2 min-w-52 w-[30%]">
               <InputWithLabelComponent
                  label="profit"
                 Input
                 type="text"
                disabled
                value={pricingData.profit ? `${pricingData?.profit}` : "00.00"}
                defaultValue={
                  pricingData.profit ? `${pricingData?.profit}` : "00.00"
                }
              />
            </div>
            <div className="grid gap-2 min-w-52 w-[30%]">
               <InputWithLabelComponent
                label="Margin"

                Input
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


export default memo(Pricing)