import { InputWithLabelComponent } from "@/components/inputcomponent";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import Pricing from "../../../productDetailsComponents/BasicInfoData/pricing";
import { produce } from "immer";

export const EditMoreThanOneValues = ({ value, setVarients, setEditValue }) => {
  const [editvalue, setEditvalue] = useState(value);

  const HandleSubmit = () => {
    setVarients(
      produce((draft) => {
        draft.productvaritions.varitionsValues.forEach((element) => {
          element.values.forEach((itemv, index) => {
            if (itemv.val === value.val) {
              element.values[index] = editvalue;
            }
          });
        });
        const { history, ...others } = draft;
        draft.history.push(others);
      })
    );
    setEditValue((prev) => ({ ...prev, open: false }));
  };
  if (Object.keys(value).length) {
    return (
      <div className="bg-[#fefefe] shadow-2xl text-black p-3 rounded-2xl">
        <p
          className="text-black my-3 font-bold text-md 
            capitalize
            "
        >
          pricing
        </p>
        {/* <Pricing submitedData={value}/> */}
        <div
          className="text-black grid 
          grid-cols-2 gap-2   bg-[#eeeeee25]"
        >
          <InputWithLabelComponent
            // defaultValue={10}
            Input
            label="price"
            name={"price"}
            value={editvalue?.price || 0}
            onChange={(e) => {
              setEditvalue((prev) => {
                let profit = 0;
                let margin = 0;

                if (prev.price !== 0 && prev?.Cost_Per_Item !== 0) {
                  profit = +prev.price || 0 - +val;
                  margin = Math.min(
                    100,
                    (+e.target.value / (+prev?.price || 1)) * 100
                  );
                } else {
                  profit = 0;
                  margin = 0;
                }
                return {
                  ...prev,
                  [e.target.name]: e.target.value,
                  profit,
                  margin,
                };
              });
            }}
            inputCss="w-fit text-sm !px-1 shadow 
              -[#ddd]   flex justify-center  
           shadow bg-white max-w-[300px]   h-[30px] !rounded-[12px]
         !p-5  !shadow-none
           "
            inputType="number"
          />
          <InputWithLabelComponent
            defaultValue={editvalue?.compare_to_price}
            Input
            label="Compare-at price"
            onChange={(e) => {
              setEditvalue((prev) => {
                return {
                  ...prev,
                  [e.target.name]: [e.target.value],
                };
              });
            }}
            name={"compare_to_price"}
            inputCss="w-fit text-sm !px-1 shadow 
              -[#ddd]   flex justify-center  
           shadow bg-white max-w-[300px]   h-[30px] !rounded-[12px]
         !p-5  !shadow-none
           "
            inputType="number"
          />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <InputWithLabelComponent
            defaultValue={editvalue?.Cost_Per_Item}
            Input
            name={"Cost_Per_Item"}
            label="Cost per item"
            onChange={(e) => {
              setEditvalue((prev) => {
                let profit = 0;
                let margin = 0;

                if (prev.price !== 0 && prev?.Cost_Per_Item !== 0) {
                  profit = +prev.price || 0 - +val;
                  margin = Math.min(
                    100,
                    (+e.target.value / (+prev?.price || 1)) * 100
                  ).toFixed(2);
                } else {
                  profit = 0;
                  margin = 0;
                }

                return {
                  ...prev,
                  [e.target.name]: e.target.value,
                  profit,
                  margin,
                };
              });
            }}
            // onChange={(e) => {
            //   setChange(e?.target.value);
            // }}
            inputCss="w-fit text-sm !px-1 shadow 
              -[#ddd]   flex justify-center  
           shadow bg-white max-w-[300px]   h-[30px] !rounded-[12px]
         !p-5  !shadow-none
           "
            inputType="number"
          />
          <InputWithLabelComponent
            defaultValue={10}
            value={editvalue?.profit}
            Input
            label="profit"
            name={"property"}
            inputCss="w-fit text-sm !px-1 shadow 
              -[#ddd]   flex justify-center  
           shadow bg-white max-w-[300px]   h-[30px] !rounded-[12px]
         !p-5  !shadow-none
           "
            inputType="text"
          />
          <InputWithLabelComponent
            value={editvalue?.margin + "%"}
            Input
            label="Margin"
            name={"property"}
            inputType={"text"}
            inputCss="w-fit text-sm !px-1 shadow 
              bg-[#ddd]   flex justify-center  
           shadow bg-white max-w-[300px]   h-[30px] !rounded-[12px]
         !p-5  !shadow-none  outline-none !border-none !focus:outline-none 
           "
          />
        </div>

        <div>
          <p className="my-3">Inventory</p>
          <div className="grid grid-cols-2 gap-2">
            <InputWithLabelComponent
              defaultValue={editvalue?.sku}
              Input
              label="sku"
              value={editvalue?.sku}
              name={"sku"}
              onChange={(e) => {
                setEditvalue((prev) => {
                  return {
                    ...prev,
                    [e.target.name]: e.target.value,
                  };
                });
              }}
              inputCss="w-fit text-sm !px-1 shadow 
                 -[#ddd]   flex justify-center  
              shadow bg-white max-w-[300px]   h-[30px] !rounded-[12px]
            !p-5  !shadow-none
              "
              inputType="text"
            />
            <InputWithLabelComponent
              value={editvalue?.barcode}
              Input
              label="barcode
    "
              name={"barcode"}
              onChange={(e) => {
                setEditvalue((prev) => {
                  return {
                    ...prev,
                    [e.target.name]: e.target.value,
                  };
                });
              }}
              inputCss="w-fit text-sm !px-1 shadow 
                 -[#ddd]   flex justify-center  
              shadow bg-white max-w-[300px]   h-[30px] !rounded-[12px]
            !p-5  !shadow-none
              "
              inputType="text"
            />
          </div>
          {console.log(editvalue)}
          <div className="  ">
            <div className="flex gap-1 my-3">
              <Checkbox
                id="TrackQUantity"
                name={"trackQuantity"}
                checked={editvalue?.trackQuantity || false}
                onCheckedChange={(value) => {
                  setEditvalue((prev) => ({ ...prev, trackQuantity: value }));
                }}
              />
              <label
                htmlFor="TrackQUantity"
                className="text-sm font-medium 
            leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Track Quantity
              </label>
            </div>

            <div className="flex gap-1 my-3">
              <Checkbox
                id="Continue_stock"
                checked={editvalue?.continue_out_stock || false}
                onCheckedChange={(value) => {
                  setEditvalue((prev) => ({
                    ...prev,
                    continue_out_stock: value,
                  }));
                }}
              />
              <label
                htmlFor="Continue_stock"
                className="text-sm font-medium 
            leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Continue selling when out of stock{" "}
              </label>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-1">
          <button
            type="button"
            className="text-[#333] 
           p-2 bg-[#eee] !my-3 rounded-xl text-center
           justify-center 
            px-2 h-[35px] flex 
            items-center  "
            onClick={() => {
              setEditvalue((prev) => ({ ...prev, open: false }));
            }}
          >
            Discard
          </button>
          <button
            type="button"
            className="text-bwhite 
           p-2 bg-black !my-3 rounded-xl text-center
            justify-center 
            px-2 h-[35px] flex 
            items-center  text-white "
            onClick={HandleSubmit}
          >
            save
          </button>
        </div>
      </div>
    );
  }
};
