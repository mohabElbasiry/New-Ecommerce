import { handleError } from "./helper/Error";

export const CreateVariationHandler = {
  handleValueChange(state, { payload: { value, index, isAr = false } }) {
    const newValues = [...state?.currentValues];
    handleError(value, index, isAr, state, state?.currentValues, state?.error);
    if (isAr) {
      // newValues[index] = {
      //   ...newValues[index],
      //   value_ar: event.target.value,
      //   color: "",
      // };
    } else {
      newValues[index] = {
        ...newValues[index],
        value_en: value,
        color: "",
      };
    }
    state.currentValues = newValues;
  },
  handleAddValue(state, action) {
    state.currentValues.push(action.payload);
  },
  FilterValueUsingIndex(state, action) {
    console.log(action, "adssssssssssssss");
    const { index } = action.payload;
    const itemsAfterFiltered = state.currentValues?.filter(
      (_, idx) => idx !== index
    );
    console.log(itemsAfterFiltered,'itemsAfterFiltered');
    state.currentValues = itemsAfterFiltered;
    // handleError(value, index, isAr, state, state?.currentValues, state?.error);
  },
};
