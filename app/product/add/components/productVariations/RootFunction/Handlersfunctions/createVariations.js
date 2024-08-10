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

  handleEditDefaultValues(state, { payload: { list = [], listIndex = -1 } }) {
    const listV = list[listIndex];

    state.currentOptions.option_en = listV.key_en;
    state.currentValues = listV.values;
  },

  handleAddValue(state, action) {
    state.currentValues.push(action.payload);
  },

  HandleUpdateOptions(state, { payload: { list, value, name } }) {
    const isOneOfOthers = list
      ?.filter((option) => !option?.edit)
      .find((option) => {
        return option.key_en.trim() === value.trim();
      });
    state.currentOptions[name] = value;
    state.currentOptions.error = isOneOfOthers ? true : false;
    state.currentOptions.ErrorMessage = isOneOfOthers
      ? "Please Enter different option name"
      : "";
  },

  FilterValueUsingIndex(state, action) {
    const { index } = action.payload;
    const itemsAfterFiltered = state.currentValues?.filter(
      (_, idx) => idx !== index
    );
    state.currentValues = itemsAfterFiltered;
    // handleError(value, index, isAr, state, state?.currentValues, state?.error);
  },
};
