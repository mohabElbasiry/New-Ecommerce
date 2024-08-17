import MultiSelect from "@/app/product/[id]/components/Select";
import { useState , useEffect  } from "react";
import { Settings, Trash2 } from "lucide-react";
import { TableOptions } from "./tableOptions/Index";
import TableHead from "./global_tableHead/Index";
import TableBody from "./global_tableBody/Index";

// const defaultData = {
//   Keys: ["Key1", "Key2", "Key3"],
//   values: [
//     {
//       Key1: "value1",
//       Key2: "value2",
//       Key3: "value3",
//     },
//   ],
//   customHeader: {
//     Key_You_want_change_this_name: () => <span>name header for Key</span>,
//   },
//   customColumn: {
//     theFirst: [
//       {
//         name: "different Key In First",
//         key: "differentKeyInFirst",
//         value: ({ item }) => <>{item ? item : "different Value In First"}</>,
//       },
//     ],
//     Key: ({ item }) => <>{item ? item : "custom Column for species key"}</>,
//     theLast: [
//       {
//         name: "different Key In Last",
//         key: "differentKeyInLast",
//         value: ({ item }) => <>{item ? item : "different Value In Last"}</>,
//       },
//     ],
//   },
//   customRow: ({ itemRow }) => (
//     <>
//       <td>return custom component for Row </td>
//       <td>return custom component for Row </td>
//       <td>return custom component for Row </td>
//     </>
//   ),
//   enableSelect: true,
// };
export default function GlobalDynamicTable({
  data  ,
  isOptions,
  navigations,
  itemId,
}) {
  const ItemsFirst =
    data?.customColumn?.theFirst?.length > 0
      ? data?.customColumn?.theFirst?.map((ItemFirst) => ItemFirst.key)
      : [];
  const ItemsLast =
    data?.customColumn?.theLast?.length > 0
      ? data?.customColumn?.theLast?.map((ItemLast) => ItemLast.key)
      : [];
  const [selectedItems, setSelectedItems] = useState([
    ...ItemsFirst,
    ...data?.Keys,
    ...ItemsLast,
  ]);
  const [selectedDataItems, setSelectedDataItems] = useState(
    data.values.map((ItemValue) => {
      const filteredItemValue = {};
      Object.keys(ItemValue).forEach((ItemVal) => {
        if (selectedItems.includes(ItemVal)) {
          if (ItemVal?.id) {
            filteredItemValue.id = ItemVal.id;
          }
          filteredItemValue[ItemVal] = ItemValue[ItemVal];
        }
      });
      return filteredItemValue;
    })
  );
  useEffect(() => {
    setSelectedDataItems(
      data.values.map((ItemValue) => {
        const filteredItemValue = {};
        Object.keys(ItemValue).forEach((ItemVal) => {
          if (ItemValue?._id) {
            filteredItemValue._id = ItemValue._id;
          }
          if (selectedItems.includes(ItemVal)) {
            filteredItemValue[ItemVal] = ItemValue[ItemVal];
          }
        });
        return filteredItemValue;
      })
    );
  }, [selectedItems, data.values]);
  const [checkedItems, setCheckedItems] = useState([]);
  console.log('selectedDataItems',selectedDataItems)

  return (
    <div className="py-0 m-5">
      <div className="p-5">
        <MultiSelect
          values={[...ItemsFirst, ...data.Keys, ...ItemsLast]}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
        />
      </div>
      <div
        className="   mt-5 relative max-h-[calc(100vh-200px)]
       overflow-x-auto overflow-y-scroll scroll-bar"
      >
        <TableOptions
          navigations={navigations}
          data={data}
          itemId={itemId}
          checkedItems={checkedItems}
          setCheckedItems={setCheckedItems}
        />
        <table className="w-full text-sm text-left table-auto">
        
        <TableHead  
          data={data} 
          isOptions={isOptions}
          checkedItems={checkedItems} 
          selectedItems={selectedItems} 
          setCheckedItems={setCheckedItems}
          selectedDataItems={selectedDataItems} 
          />
        <TableBody
          data = {data}
          selectedItems = {selectedItems}
          selectedDataItems = {selectedDataItems}
          checkedItems = {checkedItems}
          setCheckedItems = {setCheckedItems}
          isOptions  = {isOptions }
          />
        </table>
      </div>
    </div>
  );
}
