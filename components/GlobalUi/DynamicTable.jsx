import React, { useEffect, useState } from "react";
import MultiSelect from "../../app/product/[id]/components/Select";
const defaultData = {
  Keys: ["Key1", "Key2", "Key3"],

  values: [
    {
      Key1: "value1",
      Key2: "value2",
      Key3: "value3",
    },
  ],
  customHeader: {
    Key_You_want_change_this_name: () => <span>name header for Key</span>,
  },
  customColumn: {
    theFirst: [
      {
        name: "different Key In First",
        key: "differentKeyInFirst",
        value: ({ item }) => <>{item ? item : "different Value In First"}</>,
      },
    ],
    Key: ({ item }) => <>{item ? item : "custom Column for species key"}</>,
    theLast: [
      {
        name: "different Key In Last",
        key: "differentKeyInLast",
        value: ({ item }) => <>{item ? item : "different Value In Last"}</>,
      },
    ],
  },
  customRow: ({ itemRow }) => (
    <>
      <td>return custom component for Row </td>
      <td>return custom component for Row </td>
      <td>return custom component for Row </td>
    </>
  ),
  enableSelect:true,
};
export default function DynamicTable({ data = defaultData }) {
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

  const [selectedItemsValues, setSelectedItemsValues] = useState(
    data.values.map((ItemValue) => {
      const filteredItemValue = {};
      Object.keys(ItemValue).forEach((ItemVal) => {
        if (selectedItems.includes(ItemVal)) {
          filteredItemValue[ItemVal] = ItemValue[ItemVal];
        }
      });
      return filteredItemValue;
    })
  );

  useEffect(() => {
    setSelectedItemsValues(
      data.values.map((ItemValue) => {
        const filteredItemValue = {};
        Object.keys(ItemValue).forEach((ItemVal) => {
          if (selectedItems.includes(ItemVal)) {
            filteredItemValue[ItemVal] = ItemValue[ItemVal];
          }
        });
        return filteredItemValue;
      })
    );
  }, [selectedItems, data.values]);

  return (
    <div className="py-5 bg-white m-5">
      <div className="p-5">
        <MultiSelect
          values={[...ItemsFirst, ...data.Keys, ...ItemsLast]}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
        />
      </div>
      <div className="bg-white sm:rounded-lg mt-5 relative max-h-[calc(100vh-200px)] overflow-x-auto overflow-y-scroll scroll-bar">
        <table className="w-full text-sm text-left table-auto">
          <thead className="ltr:text-left rtl:text-right bg-[#E3EEEF] h-[70px]">
            <tr className="ltr:text-left rtl:text-right">
              {data?.enableSelect?<th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                #
              </th>:null}
              {data?.customColumn?.theFirst &&
              data?.customColumn?.theFirst?.length > 0
                ? data?.customColumn?.theFirst
                    ?.filter((ItemFirst) =>
                      selectedItems.includes(ItemFirst?.key)
                    )
                    ?.map((ItemFirst, index) => (
                      <th
                        key={ItemFirst.key + index}
                        className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center"
                      >
                        {ItemFirst.name}
                      </th>
                    ))
                : null}
              {selectedItems?.length
                ? selectedItems
                    ?.filter(
                      (KeySelect) =>
                        !ItemsFirst?.includes(KeySelect) &&
                        !ItemsLast?.includes(KeySelect)
                    )
                    ?.map((key) => {
                      if (data?.customHeader?.[key]) {
                        let CustomComponent = data?.customHeader?.[key];
                        return (
                          <th
                            key={key}
                            className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center"
                          >
                            <CustomComponent key={key} />
                          </th>
                        );
                      }
                      return (
                        <th
                          key={key}
                          className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center"
                        >
                          {key}
                        </th>
                      );
                    })
                : null}
              {data?.customColumn?.theLast &&
              data?.customColumn?.theLast?.length > 0
                ? data?.customColumn?.theLast
                    ?.filter((ItemLast) =>
                      selectedItems.includes(ItemLast?.key)
                    )
                    ?.map((ItemLast, index) => (
                      <th
                        key={ItemLast?.key + index}
                        className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center"
                      >
                        {ItemLast?.name}
                      </th>
                    ))
                : null}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {selectedItems.length
              ? selectedItemsValues?.map((item, idx) => (
                  <tr
                    key={selectedItems.length + idx}
                    className="bg-transparent h-32"
                  >
                    {data?.enableSelect?<td
                      className={`whitespace-nowrap px-4 py-2 text-gray-700 bg-transparent`}
                    >
                      <div className="flex text-primary gap-2 xs:w-full items-center">
                        <input className="accent-primary" type="checkbox" />
                      </div>
                    </td>:null}
                    {data?.customColumn?.theFirst &&
                    data?.customColumn?.theFirst?.length > 0
                      ? data?.customColumn?.theFirst
                          ?.filter((ItemFirst) =>
                            selectedItems.includes(ItemFirst?.key)
                          )
                          ?.map((CustomComponent, index) => (
                            <td
                              key={`first-${idx}-${index}`}
                              className={`whitespace-nowrap px-3 py-2 font-medium text-gray-600 bg-transparent text-center`}
                            >
                              <CustomComponent.value />
                            </td>
                          ))
                      : null}
                    {data?.customRow ? (
                      <data.customRow itemRow={item} />
                    ) : (
                      selectedItems?.map((key, index) => {
                        if (key && item[key]) {
                          if (data?.customColumn?.[key]) {
                            let CustomComponent = data.customColumn[key];
                            return (
                              <td
                                key={`item-${key}-${item[key]}`}
                                className={`whitespace-nowrap px-3 py-2 font-medium text-gray-600 bg-transparent text-center`}
                              >
                                <CustomComponent item={item[key]} />
                              </td>
                            );
                          }
                          return typeof item[key] === "object" ? (
                            <td
                              key={`item-${key}-${item[key]}`}
                              className={`whitespace-nowrap px-3 py-2 font-medium text-gray-600 bg-transparent text-center`}
                            >
                              {JSON.stringify(item[key])}
                            </td>
                          ) : (
                            <td
                              key={`item-${key}-${item[key]}`}
                              className={`whitespace-nowrap px-3 py-2 font-medium text-gray-600 bg-transparent text-center`}
                            >
                              {item[key]}
                            </td>
                          );
                        }
                        return null;
                      })
                    )}
                    {data?.customColumn?.theLast &&
                    data?.customColumn?.theLast?.length > 0
                      ? data?.customColumn?.theLast
                          ?.filter((ItemLast) =>
                            selectedItems.includes(ItemLast?.key)
                          )
                          ?.map((CustomComponent, index) => (
                            <td
                              key={`last-${idx}-${index}`}
                              className={`whitespace-nowrap px-3 py-2 font-medium text-gray-600 bg-transparent text-center`}
                            >
                              <CustomComponent.value />
                            </td>
                          ))
                      : null}
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
