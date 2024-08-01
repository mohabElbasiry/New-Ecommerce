import React, { memo, useCallback, useMemo } from "react";

const withChecked = (CheckComponent) => {
  return ({ checkedArray, functionToExecute, ...props }) => {

    const isChecked = functionToExecute(checkedArray);
 
    return <CheckComponent isChecked={isChecked} {...props} />;
  };
};

const Checked = memo(({ isChecked, ...props }) => {
 
   return <input type="checkbox" checked={isChecked} {...props} />;
});

export const CheckedComponent = memo(withChecked(Checked));

// return CheckedComponenttOne()
