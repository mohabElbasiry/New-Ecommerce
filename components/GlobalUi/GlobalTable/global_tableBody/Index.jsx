import { Settings, Trash2 } from 'lucide-react';
import React, { memo } from 'react'

function TableBody(
  {data, selectedItems,isOptions ,selectedDataItems,checkedItems,setCheckedItems}
) {
  return (
    <tbody className="divide-y divide-gray-200">
      {console.log('selectedItems inslide',selectedItems)}
    {selectedItems.length
      ? selectedDataItems?.map((item, idx) => (
          <tr
          style = {{
            height : '64px !important'
          }}
            key={selectedItems.length + idx}
            className={`bg-transparent h-32 ${
              checkedItems.includes(item._id)
                ? "!bg-[#F3F4F6]"
                : "!bg-white"
            }`}
          >
            {data?.enableSelect ? (
              <td
                className={`whitespace-nowrap px-4 py-1  text-gray-700 `}
              >
                <div className="flex text-primary gap-2 xs:w-full items-center">
                  <input
                    className="accent-primary"
                    type="checkbox"
                    checked={checkedItems.includes(item._id)}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      if (checked) {
                        setCheckedItems((prev) => [...prev, item._id]);
                      } else {
                        setCheckedItems((prev) =>
                          prev.filter((el) => el !== item._id)
                        );
                      }
                    }}
                  />
                </div>
              
              </td>
            ) : null}
                {selectedItems?.map((key) => {
                  if (key && item[key]) {
                    if (data?.customColumn?.[key]) {
                      let CustomComponent = data.customColumn[key];
                      return (
                        <td
                        style = {{
                           height : '64px !important'
                        }}
                        key={`item-${key}-${item[key]}`}
                        className={`whitespace-nowrap px-3 border-r border- font-medium text-gray-600 bg-transparent text-center !h-full`}
                        >
                          <CustomComponent item={item[key]} /> 
                        </td>
                      );
                    }
                    return typeof item[key] === "object" ? (
                      <td
                        key={`item-${key}-${item[key]}`}
                        className={`whitespace-nowrap px-3 [background:blue] font-medium text-gray-600 bg-transparent text-center`}
                      
                      >
                        {JSON.stringify(item[key])}
                      </td>
                    ) : (
                      <td
                        key={`item-${key}-${item[key]}`}
                        className={`whitespace-nowrap px-3 py-2 [background:green] font-medium text-gray-600 bg-transparent text-center`}
                      
                      >
                        {item[key]}
                      </td>
                    );
                  }
                  return null;
                })}
                {isOptions ? (
                  <td
                    className={`whitespace-nowrap px-3 py-2 font-medium  text-gray-600 bg-transparent text-center`}
                   
                  >
                    <div className="flex items-center justify-center">
                      <Settings
                        className="cursor-pointer mx-1"
                        onClick={() => isOptions.edit(item._id)}
                      />
                      <Trash2
                        className="cursor-pointer"
                        onClick={() => isOptions.delete(item._id)}
                      />
                    </div>
                  </td>
                ) : null}
            
          </tr>
        ))
      : null}
  </tbody>
  )
}

export default memo(TableBody)
