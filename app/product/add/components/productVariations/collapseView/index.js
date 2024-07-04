import { useMemo } from "react";

export const CollapseView = ({
   varitions=[]
}) => {

  function sortValuesByKey(values, valueKey, order = 'asc') {
    return values.sort((a, b) => {
        if (order === 'asc') {
            return a[valueKey] > b[valueKey] ? 1 : -1;
        } else if (order === 'desc') {
            return a[valueKey] < b[valueKey] ? 1 : -1;
        } else {
            throw new Error("Invalid order parameter. Use 'asc' or 'desc'.");
        }
    });
}

  useMemo(()=>{
    let sortedItems = varitions.map(item => {
      return {
          ...item,
          values: sortValuesByKey(item.values, 'value_en', 'asc')
      };
  });

  console.log(sortedItems,'MOhbaasdddddddddddddddd');
  },[JSON.stringify(varitions)])
  console.log(varitions,'varitions');



    
  return <></>;
};
