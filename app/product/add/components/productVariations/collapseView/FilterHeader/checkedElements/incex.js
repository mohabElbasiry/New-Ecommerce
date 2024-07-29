import React, { memo, useCallback, useMemo } from "react";

const withChecked = (CheckComponent) => {
  return ({ checkedArray, functionToExecute, ...props }) => {

    const isChecked = functionToExecute(checkedArray);
    console.log(checkedArray, "isCheckeaddsaaaaaaaaaaaa");

    return <CheckComponent isChecked={isChecked} {...props} />;
  };
};

const Checked = memo(({ isChecked, ...props }) => {
  console.log("hello rerender");

  console.log(isChecked, "isCheckedisChecked");
  return <input type="checkbox" checked={isChecked} {...props} />;
});

export const CheckedComponent = memo(withChecked(Checked));

// return CheckedComponenttOne()
