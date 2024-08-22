import { produce } from "immer";
import { handleError } from "./helper/Error";

export const CreateVariationHandler = {
  handleValueChange: (state, { payload: 
    { value, index, isAr = false } }) => {
    handleError(value, index, isAr, state, state?.currentValues, state?.error);

    if (isAr) {
      // draft.currentValues[index] = {
      //   ...draft.currentValues[index],
      //   value_ar: value,
      //   color: "",
      // };
    } else {
      state.currentValues[index] = {
        ...state.currentValues[index],
        value_en: value,
        color: "",
      };
    }
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
  updateColor(state, {
    payload:{index,color}
  }) {
    state.currentValues[index].color=color
      console.log( index,color,'statestate');
    
    // handleError(value, index, isAr, state, state?.currentValues, state?.error);
  },
};
