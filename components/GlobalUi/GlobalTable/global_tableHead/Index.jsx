import React, { memo } from 'react'

function TableHead({data,checkedItems,selectedItems,setCheckedItems,selectedDataItems,isOptions}) {
  return (
    <thead className="ltr:text-left rtl:text-right bg-[#E6E6E6] h-[60px]">
    <tr className="ltr:text-left rtl:text-right">
     {data?.enableSelect ? (
      <th className="whitespace-nowrap font-medium text-gray-900 text-center  w-[50px]">
    <input
      className="accent-primary h-5 w-5"
      type="checkbox"
      checked={checkedItems?.length}
      onChange={() => {
        checkedItems?.length
          ? setCheckedItems([])
          : setCheckedItems(
              selectedDataItems.map((vl) => vl._id)
            );
      }}
    />
    {data.enableSelect && checkedItems?.length ? (
      <span>{checkedItems.length} selected</span>
    ) : null}
  </th>
) : null}
  
  {data.Keys.filter((key) => selectedItems.includes(key) ).map((key,index) => (
     <th
     key={key + index}
     className="whitespace-nowrap px-4 font-medium text-gray-900 text-center
      border-r border-r-[#D4D4D4]"
   >
     {key}
   </th>
  ) )}
{isOptions /* &&data?.customColumn?.theLast */ ? (
  <th
    className="whitespace-nowrap px-4   
  font-medium text-gray-900 text-center "
  ></th>
) : null}
     </tr>

   </thead>
  )
}
export default memo(TableHead)