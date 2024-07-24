import { produce } from 'immer';
import React, { useState } from 'react'

export default function ShippingInfo(setSubmitedData,submitedData ) {

    const [isChecked, setIsChecked] = useState(false);
    const [TypeWeight, setTypeWeight] = useState("");
    const [weightType, setWeightType] = useState(submitedData?.WeightType || "kg");
    const [weight, setWeight] = useState(submitedData?.Weight || 0);
    const handleCheckboxChange = () => {
      setIsChecked(!isChecked);
    };
    const handleWeightChange = (e) => {
        const value = e.target.value;
        setWeight(value);
        setSubmitedData(
          produce((draft) => {
            draft.Weight = value ;
          })
        );
      };
    
      const handleWeightTypeChange = (e) => {
        const value = e.target.value;
        setWeightType(value);
        setSubmitedData(
          produce((draft) => {
            draft.WeightType = value;
          })
        );
      };
  return (
    <>
       <h3 className="font-medium ">Shipping</h3>
      <div className=" bg-white rounded-lg border-[0.5px] shadow p-5">
         
          <div className="flex gap-8 mt-5  flex-col">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="text-gray-700">This is a physical product</span>
            </label>
            {isChecked ? (
              <div className="flex gap-5  flex-wrap">
                <div className="grid gap-2 min-w-60 w-[45%]">
                  <h4 className="text-gray-500">Weight</h4>
                  <div className="relative flex gap-2">
                  <input
                    className="w-full p-1.5 text-[#333] appearance-none px-3 focus:outline-none border rounded-md"
                    type="text"
                    onChange={handleWeightChange}
                    value={weight}
                  />
                  <select
                    className="absolute right-0   p-1.5 text-[#333] appearance-none px-3 focus:outline-none border rounded-md"
                    onChange={handleWeightTypeChange}
                    value={weightType}
                  >
                    <option value="kg">kg</option>
                    <option value="g">g</option>
                    <option value="lb">lb</option>
                    <option value="oz">oz</option>
                  </select>
                </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
    </>
  )
}