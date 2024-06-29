import { InputWithLabelComponent } from "@/components/inputcomponent";
import { useState } from "react";

export const TableData = ({ autoGenerate, setAutoGenerate }) => {
  const [checkedElements, setCheckedElements] = useState([]);

  const CheckBox = (e, idx) => {
    setCheckedElements((prev) => {
      if (e.target.checked) {
        const founded = prev?.find((item) => item === idx);
        if (founded !== undefined) {
          return prev?.filter((item) => item !== idx);
        } else {
          return [...prev, idx];
        }
      } else {
        return prev?.filter((item) => item !== idx);
      }
    });
  };

  return (
    <div className="w-[100%] overflow-auto">
      <div className="overflow-x-auto rounded-lg border border-gray-200 relative">
        <InputWithLabelComponent
          Input={false}
          inputCss="w-[20%] ml-auto !p-1 mx-2 shadow   "
          PlaceHolder="Update"
          selectArray={[
            "Edit Prices",
            "Edit barcodes",
            "Edit/add images",
            "Remve Images",
            "Remove Images",
            "Edit Sku",
            "Edit Quantities",
            "continue Selling when out of stock",
          ]}
          defaultSelected="bulk edit"
        />

        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm ">
          <thead className="text-left ">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900  ">
                <input
                  type={"checkbox"}
                  onChange={(e) => {
                    if (e?.target?.checked) {
                      setCheckedElements(autoGenerate?.map((item, idx) => idx));
                    } else {
                      setCheckedElements([]);
                    }
                  }}
                  checked={checkedElements?.length}
                  className="!h-[25px] flex text-[25px] items-center w-[20px] p-3"
                />
              </th>

              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Image
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Variants
              </th>

              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Price
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Avaliability
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Edit
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {autoGenerate?.length
              ? autoGenerate?.map((item, idx) => {
                  return (
                    <tr>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        <input
                          type={"checkbox"}
                          className="!h-[25px] flex text-[25px] items-center w-[20px] p-3"
                          onChange={(e) => CheckBox(e, idx)}
                          checked={checkedElements?.some(
                            (item) => item === idx
                          )}
                        />
                      </td>
                      <td>
                        <div className="relative w-fit cursor-pointer">
                          <input
                            type="file"
                            className="opacity-0 absolute top-0 left-0 z-[3] w-full h-full"
                          />
                          <button>
                            <img
                              className="W-[30px] h-[30px] cursor-pointer"
                              src="/addImage.svg"
                            />
                          </button>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {item?.values?.map((item) => {
                          return <>{item?.value_en}/</>;
                        })}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        <InputWithLabelComponent
                          Input
                          inputCss="w-fit   text-sm !px-1 shadow 
                             p-2 text-center  border border-black   flex justify-center !p-0 
                              shadow bg-white max-w-[100px] !p-3 h-[30px]"
                          value="0"
                          inputType="number"
                        />
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        <InputWithLabelComponent
                          Input
                          inputCss="w-fit   text-sm  shadow  p-2 text-center 
                             border border-black flex justify-center !p-0   shadow bg-white max-w-[100px] !p-3 h-[30px]"
                          value="0"
                          inputType="number"
                        />
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 sticky right-0   bg-white z-[3]  border-l ">
                        <button className="p-3 border shadow h-[40px] flex items-center justify-center rounded-md text-sm">
                          Edit
                        </button>
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>

        <div
          className="bulkedit absolute bottom-0
       left-[50%] right-[50%] translate-x-[-50%] z-[10] bg-[#dddddd]
        shadow-lg border border-[#ddd] w-[20%]  rounded-2xl p-1"
        >
          <button className="bg-white p-2 rounded-2xl text-xs shadow">
            Bulk Edit
          </button>
        </div>
      </div>
    </div>
  );
};
