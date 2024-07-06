import { InputWithLabelComponent } from "@/components/inputcomponent";
import { useState } from "react";
import { BulkEdit } from "../Update/updateFields.js/BulkEdit/BulkEdit";
import { SelectedArrayCheckBox } from "../Update/selectedArray";
import { UpdateFeildActionFunction } from "../Update/updateFields.js";
import { UpdateQualityImages } from "../Update/updateImages";

export const TableData = ({
  autoGenerate,
  setAutoGenerate,
  setBeforeFiltered,
}) => {
  {
    keys: [];
  }
  const [checkedElements, setCheckedElements] = useState([]);

  return (
    <div className="max-h-[600px] max-w-[100%]  overflow-auto ">
      <div className="rounded-lg border border-gray-200 relative">
        <BulkEdit
          checkedElements={checkedElements}
          setAutoGenerate={setAutoGenerate}
          setBeforeFiltered={setBeforeFiltered}
          autoGenerate={autoGenerate}
        />

        <table
          className="min-w-full divide-y-2 
         divide-gray-200 bg-white text-sm    "
        >
          <thead className="text-left   ">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900  ">
                <SelectedArrayCheckBox
                  all
                  setCheckedElements={setCheckedElements}
                  checkedElements={checkedElements}
                  autoGenerate={autoGenerate}
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
                sku
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Barcode
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900   sticky right-0 z-10 bg-white">
                Edit
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {autoGenerate?.length
              ? autoGenerate?.map((item, idx) => {
                  console.log(item, "tableItemsda");
                  return (
                    <tr>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        <SelectedArrayCheckBox
                          all={false}
                          setCheckedElements={setCheckedElements}
                          idx={idx}
                          autoGenerate={autoGenerate}
                          checkedElements={checkedElements}
                        />
                      </td>
                      <td>
                        <UpdateQualityImages
                          setAutoGenerate={setAutoGenerate}
                          setBeforeFiltered={setBeforeFiltered}
                          index={idx}
                          item={item}
                        />
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {item?.values?.map((item) => {
                          return <>{item?.value_en}/</>;
                        })}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        <UpdateFeildActionFunction
                          checkedElements={checkedElements}
                          item
                          idx={idx}
                          property={"price"}
                          setAutoGenerate={setAutoGenerate}
                          setBeforeFiltered={setBeforeFiltered}
                          value={item?.price}
                          itemValue={item}
                        />
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        <UpdateFeildActionFunction
                          checkedElements={checkedElements}
                          item
                          idx={idx}
                          property={"quantity"}
                          setAutoGenerate={setAutoGenerate}
                          setBeforeFiltered={setBeforeFiltered}
                          value={item?.quantity}
                          itemValue={item}
                        />
                      </td>
                      <td>
                        <UpdateFeildActionFunction
                          checkedElements={checkedElements}
                          item
                          idx={idx}
                          property={"sku"}
                          setAutoGenerate={setAutoGenerate}
                          setBeforeFiltered={setBeforeFiltered}
                          value={item?.sku}
                          itemValue={item}
                        />
                      </td>
                      <td>
                        <UpdateFeildActionFunction
                          checkedElements={checkedElements}
                          item
                          idx={idx}
                          property={"Barcode"}
                          setAutoGenerate={setAutoGenerate}
                          setBeforeFiltered={setBeforeFiltered}
                          value={item?.sku}
                          itemValue={item}
                        />
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 sticky right-0 font-medium text-gray-900   right-0   bg-white z-[3]  border-l ">
                        <button
                         className="p-3 border shadow h-[40px] flex items-center
                          justify-center rounded-md text-sm" type="button">
                          Edit
                        </button>
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>

        {/* <div
          className="bulkedit absolute bottom-0
       left-[50%] right-[50%] translate-x-[-50%] z-[10] bg-[#dddddd]
        shadow-lg border border-[#ddd] w-[20%]  rounded-2xl p-1"
        >
          <button className="bg-white p-2 rounded-2xl text-xs shadow">
            Bulk Edit
          </button>
        </div> */}
      </div>
    </div>
  );
};
