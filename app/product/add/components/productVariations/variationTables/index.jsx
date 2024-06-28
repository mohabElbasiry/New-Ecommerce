import { InputWithLabelComponent } from "@/components/inputcomponent";
import { useEffect, useState } from "react";
import { generateQualities } from "./generateQualitiesOptions";
import { getKeysAndValues } from "./getUniqukeysAndValue";

export const VariationTable = ({ varitions }) => {
  console.log(varitions, "varitions");
  const [autoGenerate, setAutoGenerate] = useState([]);
  const isAr = "ar";
  const updatedVaration = varitions?.map((item) => {
    return {
      key_en: item?.option,
    };
  });

  useEffect(() => {
    if (varitions?.length) {
      const Refactor = varitions?.map((item) => {
        const { key_en, key_ar, values } = item;

        return {
          key_en,
          key_ar,
          values,
        };
      });
      setAutoGenerate(generateQualities(varitions));
    }
  }, [varitions]);
  return (
    <div className="w-[100%] mt-3 bg-[#eeeeee7d] p-2 rounded-3 border shadow-md">
      <div className="flex justify-between items-center px-2">
        <div className="GroupBy flex items-center  text-sm gap-3">
          <p>Group by</p>
          <InputWithLabelComponent
            Input={false}
            PlaceHolder="Group By"
            inputCss="w-fit !p-1 shadow border border-[#ddd]  "
            selectArray={["hello", "dsdsa", "dasdas"]}
          />
        </div>
      </div>
      <div className="searchSortCOmponent">
        <InputWithLabelComponent
          Input
          inputCss="border border-[#333] !p-1 !px-2 !text-black "
          PlaceHolder="search"
        />

        <div className="grid grid-cols-6 gap-3">
          {varitions?.map((item) => {
            return (
              <InputWithLabelComponent
                Input={false}
                PlaceHolder="Group By"
                inputCss="w-fit !p-1 text-sm !px-1 shadow border border-[#ddd]  "
                selectArray={item?.currentValues?.map((iv) => {
                  return iv?.value_en;
                })}
              />
            );
          })}
        </div>
      </div>
      <div className="w-[100%] overflow-auto">
        {/*
  Heads up! 👋

  This component comes with some `rtl` classes. Please remove them if they are not needed in your project.
*/}

        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm ">
            <thead className="text-left ">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900  ">
                  <input
                    type={"checkbox"}
                    className="!h-[25px] flex text-[25px] items-center w-[20px] p-3"
                  />
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Date of Birth
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Role
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Salary
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Salary
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Salary
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Salary
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Salary
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Salary
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Salary
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 sticky right-0 bg-white z-[3]">
                  Edit
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {autoGenerate?.length ? (
               autoGenerate?.map((item,idx)=>{
                console.log(item,'item')
                return( <tr>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    <input
                      type={"checkbox"}
                      className="!h-[25px] flex text-[25px] items-center w-[20px] p-3"
                    />
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                {item?.values?.map(item=>{
                  return(<>
                    {item?.value_en}/
                  </>)
                })}
                  </td>
             

                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 sticky right-0   bg-white z-[3]  border-l ">
                    <button className="p-3 border shadow h-[40px] flex items-center justify-center rounded-md text-sm">
                      Edit
                    </button>
                  </td>
                </tr>)
               })
              ) : null}

              {/* <tr>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  <input
                    type={"checkbox"}
                    className="!h-[25px] flex text-[25px] items-center w-[20px] p-3"
                  />
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  24/05/1995
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  Web Developer
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  $120,000
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  $120,000
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  $120,000
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  $120,000
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  $120,000
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  $120,000
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  $120,000
                </td>

                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 sticky right-0   bg-white z-[3]  border-l ">
                  <button className="p-3 border shadow h-[40px] flex items-center justify-center rounded-md text-sm">
                    Edit
                  </button>
                </td>
              </tr>
              <tr>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  <input
                    type={"checkbox"}
                    className="!h-[25px] flex text-[25px] items-center w-[20px] p-3"
                  />
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  24/05/1995
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  Web Developer
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  $120,000
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  $120,000
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  $120,000
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  $120,000
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  $120,000
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  $120,000
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  $120,000
                </td>

                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 sticky right-0   bg-white z-[3]  border-l ">
                  <button className="p-3 border shadow h-[40px] flex items-center justify-center rounded-md text-sm">
                    Edit
                  </button>
                </td>
              </tr>
              <tr>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  <input
                    type={"checkbox"}
                    className="!h-[25px] flex text-[25px] items-center w-[20px] p-3"
                  />
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  24/05/1995
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  Web Developer
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  $120,000
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  $120,000
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  $120,000
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  $120,000
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  $120,000
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  $120,000
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  $120,000
                </td>

                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 sticky right-0   bg-white z-[3]  border-l ">
                  <button className="p-3 border shadow h-[40px] flex items-center justify-center rounded-md text-sm">
                    Edit
                  </button>
                </td>
              </tr> */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
